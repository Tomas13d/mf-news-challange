import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { useAuth } from "@/context/useAuth";
import NextLink from "next/link";
import { showError } from "@/utils/showAlert";
import { ApiError } from "@/services/api";

export default function LoginForm() {
  const { login } = useAuth();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          p: 5,
          borderRadius: 3,
          boxShadow: 6,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Email inválido").required("Requerido"),
            password: Yup.string().required("Requerido"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await login(values.email, values.password);
            } catch (err: any) {
              if (err instanceof ApiError) {
                showError("Error de inicio de sesión", err.message);
                setErrors({ email: err.message });
              } else {
                showError("Error desconocido", "Ocurrió un error inesperado");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, touched, errors, isSubmitting }) => (
            <Form noValidate>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#d32f2f",
                  mb: 4,
                }}
              >
                Bienvenido a MFNews
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Correo electrónico"
                placeholder="ejemplo@correo.com"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Contraseña"
                placeholder="Tu contraseña"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />

              <Box mt={4}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  sx={{
                    backgroundColor: "#d32f2f",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                    },
                  }}
                >
                  Iniciar sesión
                </Button>
              </Box>

              <Box mt={3} textAlign="center">
                <Typography variant="body2">
                  ¿No tienes cuenta?{" "}
                  <MuiLink
                    component={NextLink}
                    href="/register"
                    sx={{ color: "#d32f2f", fontWeight: 500 }}
                  >
                    Regístrate
                  </MuiLink>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
