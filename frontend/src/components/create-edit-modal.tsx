import React, { useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormHelperText,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Categories, News } from "@/types/News";
import { createNews, updateNews } from "@/services/News";
import { showError, showSuccess } from "@/utils/showAlert";
import { generateNews, improveText } from "@/services/OpenAI";
import SmartToyIcon from "@mui/icons-material/SmartToy";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleRefresh: () => void;
  editingNews?: News | null;
}

const createNewsSchema = Yup.object({
  title: Yup.string().required().min(5).max(100),
  body: Yup.string().required().min(20),
  summary: Yup.string().max(250).nullable(),
  author: Yup.string().required().min(3).max(50),
  date: Yup.date().required().max(new Date()),
  category: Yup.string().required().min(3).max(30),
  imageUrl: Yup.string().url().nullable(),
});

const CATEGORIES: Categories[] = ["Fútbol", "NBA", "Tenis"] 

export default function CreateEditModal({
  open,
  handleClose,
  handleRefresh,
  editingNews,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    summary: "",
    author: "",
    date: "",
    category: "",
    imageUrl: "",
  });

  const [isImproving, setIsImproving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Actualizar solo cuando se abre y hay editingNews
  useEffect(() => {
    if (open) {
      if (editingNews) {
        setFormData({
          title: editingNews.title || "",
          body: editingNews.body || "",
          summary: editingNews.summary || "",
          author: editingNews.author || "",
          date: editingNews.date
            ? new Date(editingNews.date).toISOString().split("T")[0]
            : "",
          category: editingNews.category || "",
          imageUrl: editingNews.imageUrl || "",
        });
      } else {
        setFormData({
          title: "",
          body: "",
          summary: "",
          author: "",
          date: "",
          category: "",
          imageUrl: "",
        });
      }
    }
  }, [open, editingNews]);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: createNewsSchema,
    onSubmit: async (values) => {
      try {
        const valuesWithFormattedDate = {
          ...values,
          date: new Date(values.date).toISOString(),
        };

        if (editingNews) {
          const updatedFields: Partial<News> = {};

          (
            Object.keys(valuesWithFormattedDate) as (keyof Omit<News, "id">)[]
          ).forEach((key) => {
            const newValue = valuesWithFormattedDate[key];
            const oldValue =
              key === "date"
                ? formData.date
                  ? new Date(formData.date).toISOString()
                  : ""
                : formData[key];

            if (newValue !== oldValue) {
              updatedFields[key] = newValue;
            }
          });

          if (Object.keys(updatedFields).length === 0) {
            showSuccess("No hay cambios para actualizar");
            handleClose();
            return;
          }

          await updateNews(editingNews.id, valuesWithFormattedDate);
          showSuccess("Noticia actualizada con éxito");
        } else {
          await createNews(valuesWithFormattedDate);
          showSuccess("Noticia creada con éxito");
        }
        handleRefresh();
        handleClose();
      } catch (err) {
        showError("Error al guardar la noticia");
      }
    },
  });

  const handleImproveBody = async () => {
    try {
      setIsImproving(true);
      const res = await improveText(formik.values.body);
      formik.setFieldValue("body", res.improved);
      setFormData((prev) => ({ ...prev, body: res.improved }));
    } catch (err) {
      showError("No se pudo mejorar el texto");
    } finally {
      setIsImproving(false);
    }
  };

  const handleCreateWithAI = async () => {
    try {
      setIsGenerating(true);
      const generated = await generateNews();
      const values = {
        title: generated.title,
        body: generated.body,
        summary: generated.summary || "",
        author: generated.author,
        date: new Date(generated.date).toISOString().split("T")[0],
        category: generated.category,
        imageUrl: generated.imageUrl || "",
      };
      setFormData(values);
      formik.setValues(values);
    } catch (err) {
      showError("No se pudo generar la noticia");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingNews ? "Editar" : "Crear"} Noticia</DialogTitle>
      <DialogContent>
        {!editingNews?.title && (
          <Box sx={{ display: "flex" }}>
            <Button
              variant="text"
              onClick={handleCreateWithAI}
              disabled={isGenerating || isImproving}
              sx={{
                mb: 1,
                mt: 3,
                p:2,
                ml: "auto",
                background: "linear-gradient(to right, #00C6FF, #0072FF)",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                transition: "0.3s",
                boxShadow: "0 4px 10px rgba(0, 114, 255, 0.3)",
                "&:hover": {
                  background: "linear-gradient(to right, #0097d1, #0054c4)",
                  boxShadow: "0 6px 12px rgba(0, 114, 255, 0.4)",
                },
              }}
              startIcon={<SmartToyIcon />}
              size="small"
            >
              {isGenerating ? "Generando..." : "Crear noticia con AI"}
            </Button>
          </Box>
        )}

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
        {[
  { name: "title", label: "Título" },
  { name: "body", label: "Cuerpo", multiline: true, minRows: 4 },
  {
    name: "summary",
    label: "Resumen",
    multiline: true,
    minRows: 2,
  },
  { name: "author", label: "Autor" },
  { name: "date", label: "Fecha", type: "date" },
  { name: "category", label: "Categoría" },
  { name: "imageUrl", label: "URL de Imagen" },
].map((field) => {
  const isBodyField = field.name === "body";

  if (field.name === "category") {
    return (
      <FormControl
        key={field.name}
        fullWidth
        size="small"
        margin="normal"
        error={formik.touched.category && Boolean(formik.errors.category)}
      >
        <InputLabel id="category-label">Categoría</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          label="Categoría"
          {...formik.getFieldProps("category")}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.category && formik.errors.category && (
          <FormHelperText>{formik.errors.category}</FormHelperText>
        )}
      </FormControl>
    );
  }

  return (
    <TextField
      key={field.name}
      fullWidth
      margin="normal"
      disabled={isGenerating || (isBodyField && isImproving)}
      label={
        isGenerating || (isBodyField && isImproving)
          ? "Generando..."
          : field.label
      }
      type={field.type || "text"}
      multiline={field.multiline}
      minRows={field.minRows}
      {...formik.getFieldProps(field.name)}
      error={
        formik.touched[field.name as keyof typeof formik.touched] &&
        Boolean(formik.errors[field.name as keyof typeof formik.errors])
      }
      helperText={
        formik.touched[field.name as keyof typeof formik.touched] &&
        formik.errors[field.name as keyof typeof formik.errors]
      }
      InputLabelProps={field.name === "date" ? { shrink: true } : undefined}
      InputProps={{
        readOnly: isGenerating || (isImproving && isBodyField),
        endAdornment: isBodyField && (
          <Button
            onClick={handleImproveBody}
            disabled={isImproving || isGenerating}
            startIcon={<SmartToyIcon />}
            size="small"
            variant="text"
            sx={{
              ml: 1,
              p: 1,
              fontWeight: 500,
              textTransform: "none",
              color: "#0072FF",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "rgba(0, 198, 255, 0.1)",
                borderColor: "#0072FF",
                color: "#0072FF",
              },
            }}
          >
            Mejorar con AI
          </Button>
        ),
      }}
    />
  );
})}


            <DialogActions>
              <Button onClick={handleClose} color="inherit">
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isImproving || isGenerating}
              >
                {editingNews ? "Actualizar" : "Crear"}
              </Button>
            </DialogActions>
          </form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
