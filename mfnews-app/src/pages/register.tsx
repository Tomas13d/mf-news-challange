import React from "react";
import { useAuth } from "@/context/useAuth";
import { Button, TextField, Box, Typography, Card, Container, Link as MuiLink } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import NextLink from "next/link";

export default function RegisterForm() {
  const { register } = useAuth();

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
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
          initialValues={{ name: "", email: "", password: "", confirm: "" }}
          validationSchema={Yup.object({
            name: Yup.string().min(2, "Muy corto").required("Requerido"),
            email: Yup.string().email("Email inválido").required("Requerido"),
            password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
            confirm: Yup.string()
              .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
              .required("Requerido"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              await register(values.name, values.email, values.password);
            } catch (err: any) {
              setErrors({ email: "Email ya registrado" });
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
                Crear cuenta en MFNews
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Nombre completo"
                placeholder="Tu nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
              />

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
                InputProps={{ sx: { borderRadius: 2 } }}
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
                InputProps={{ sx: { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                name="confirm"
                value={values.confirm}
                onChange={handleChange}
                error={touched.confirm && Boolean(errors.confirm)}
                helperText={touched.confirm && errors.confirm}
                variant="outlined"
                InputProps={{ sx: { borderRadius: 2 } }}
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
                  Registrarme
                </Button>
              </Box>

              <Box mt={3} textAlign="center">
                <Typography variant="body2">
                  ¿Ya tienes una cuenta?{" "}
                  <MuiLink
                    component={NextLink}
                    href="/login"
                    sx={{ color: "#d32f2f", fontWeight: 500 }}
                  >
                    Iniciar sesión
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
