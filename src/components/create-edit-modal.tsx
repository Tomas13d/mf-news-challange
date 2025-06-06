import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createNews, updateNews } from "../services/News";
import { showSuccess, showError } from "../utils/showAlert";
import { News } from "../types/News";

interface NewsModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<News>;
  refetch: () => void;
}

export default function CreateEditModal({
  open,
  onClose,
  initialData = {},
  refetch,
}: NewsModalProps) {
  const isEditMode = Boolean(initialData?.id);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: initialData.title || "",
      body: initialData.body || "",
      summary: initialData.summary || "",
      author: initialData.author || "",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : "",
      category: initialData.category || "",
      imageUrl: initialData.imageUrl || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("El título es obligatorio"),
      body: Yup.string().required("El cuerpo es obligatorio"),
      author: Yup.string().required("El autor es obligatorio"),
      date: Yup.string().required("La fecha es obligatoria"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Convertir fecha a ISO
        const valuesWithFormattedDate = {
          ...values,
          date: new Date(values.date).toISOString(),
        };

        if (isEditMode) {
          const updatedFields: Partial<News> = {};

          (
            Object.keys(valuesWithFormattedDate) as (keyof Omit<News, "id">)[]
          ).forEach((key) => {
            const newValue = valuesWithFormattedDate[key];
            const oldValue =
              key === "date"
                ? initialData.date
                  ? new Date(initialData.date).toISOString()
                  : ""
                : initialData[key];

            if (newValue !== oldValue) {
              updatedFields[key] = newValue;
            }
          });

          if (Object.keys(updatedFields).length === 0) {
            showSuccess("No hay cambios para actualizar");
            onClose();
            return;
          }

          await updateNews(initialData.id as number, updatedFields);
          showSuccess("Noticia actualizada correctamente");
          refetch();
        } else {
          await createNews(valuesWithFormattedDate);
          showSuccess("Noticia creada exitosamente");
          refetch();
        }

        resetForm();
        onClose();
      } catch (error) {
        showError("Ocurrió un error al procesar la noticia");
      }
    },
  });

  const handleImproveBody = () => {
    showError("Función de AI para mejorar redacción todavía no implementada.");
  };

  const handleCreateWithAI = () => {
    showError("Función de AI para crear noticia todavía no implementada.");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "white",
          p: 3,
          mx: "auto",
          mt: 8,
          borderRadius: 2,
          boxShadow: 24,
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Botón destacado: Crear noticia con AI */}
        {!isEditMode && (
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              onClick={handleCreateWithAI}
              sx={{
                mb: 1,
                mt: 3,
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
              Crear noticia con AI
            </Button>
          </Box>
        )}

        <Typography variant="h6" gutterBottom>
          {initialData?.id ? "Editar noticia" : "Crear noticia"}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Título"
              fullWidth
              size="small"
              {...formik.getFieldProps("title")}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>

          <Grid size={12}>
            <Grid size={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <Button
                  onClick={handleImproveBody}
                  startIcon={<SmartToyIcon />}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                    textTransform: "none",
                    borderColor: "#00C6FF",
                    color: "#0072FF",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(0, 198, 255, 0.1)",
                      borderColor: "#0072FF",
                      color: "#0072FF",
                    },
                  }}
                >
                  Mejorar con AI
                </Button>
              </Box>

              <TextField
                label="Cuerpo de la noticia"
                fullWidth
                multiline
                minRows={4}
                size="small"
                {...formik.getFieldProps("body")}
                error={formik.touched.body && Boolean(formik.errors.body)}
                helperText={formik.touched.body && formik.errors.body}
              />
            </Grid>
          </Grid>

          <Grid size={12}>
            <TextField
              label="Resumen"
              fullWidth
              size="small"
              {...formik.getFieldProps("summary")}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Autor"
              fullWidth
              size="small"
              {...formik.getFieldProps("author")}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Fecha"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              {...formik.getFieldProps("date")}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Categoría"
              fullWidth
              size="small"
              {...formik.getFieldProps("category")}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="URL de imagen"
              fullWidth
              size="small"
              {...formik.getFieldProps("imageUrl")}
            />
          </Grid>

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              size="small"
              sx={{ textTransform: "none" }}
            >
              Guardar noticia
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
