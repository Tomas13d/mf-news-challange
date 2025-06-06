// __tests__/auth.test.ts
import request from "supertest";
import express from "express";
import * as AuthController from "../controllers/auth";
import * as AuthService from "../services/auth";

jest.mock("../services/auth");
const mockedAuthService = AuthService as jest.Mocked<typeof AuthService>;

const app = express();
app.use(express.json());
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

describe("Auth API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /register", () => {
    it("debería registrar un usuario exitosamente", async () => {
      mockedAuthService.registerUser.mockResolvedValueOnce({
        id: 4,
        email: "t@g.com",
        password: "asas",
        name: "tomas",
        createdAt: new Date(),
      });

      const response = await request(app).post("/register").send({
        email: "t@g.com",
        password: "123456",
        name: "tomas",
      });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        email: "t@g.com",
        name: "tomas",
      });
      expect(typeof response.body.id).toBe("number");
      expect(typeof response.body.createdAt).toBe("string");
      expect(mockedAuthService.registerUser).toHaveBeenCalledWith(
        "t@g.com",
        "123456",
        "tomas"
      );
    });

    it("debería responder con error 400 si falla el registro", async () => {
      mockedAuthService.registerUser.mockRejectedValueOnce(
        new Error("Error al registrar")
      );

      const response = await request(app).post("/register").send({
        email: "t@g.com",
        password: "123456",
        name: "tomas",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Error al registrar" });
    });
  });

  describe("POST /login", () => {
    it("debería iniciar sesión exitosamente", async () => {
        const date = new Date()
      mockedAuthService.loginUser.mockResolvedValueOnce({
        user: {
          id: 6,
          email: "t@g.com",
          name: "tomas",
          password: "$2b$10$hashedpassword",
          createdAt: date,
        },
        token: "fake-jwt-token",
      });

      const response = await request(app).post("/login").send({
        email: "t@g.com",
        password: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        user: {
          id: 6,
          email: "t@g.com",
          name: "tomas",
        },
        token: "fake-jwt-token",
      });
      expect(response.body.user).not.toHaveProperty("password");
      expect(mockedAuthService.loginUser).toHaveBeenCalledWith(
        "t@g.com",
        "123456"
      );
    });

    it("debería responder con error 401 si credenciales inválidas", async () => {
      mockedAuthService.loginUser.mockRejectedValueOnce(
        new Error("Credenciales inválidas")
      );

      const response = await request(app).post("/login").send({
        email: "t@g.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: "Credenciales inválidas" });
    });
  });
});
