"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// __tests__/auth.test.ts
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const AuthController = __importStar(require("../controllers/auth"));
const AuthService = __importStar(require("../services/auth"));
jest.mock("../services/auth");
const mockedAuthService = AuthService;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
describe("Auth API", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("POST /register", () => {
        it("debería registrar un usuario exitosamente", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedAuthService.registerUser.mockResolvedValueOnce({
                id: 4,
                email: "t@g.com",
                password: "asas",
                name: "tomas",
                createdAt: new Date(),
            });
            const response = yield (0, supertest_1.default)(app).post("/register").send({
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
            expect(mockedAuthService.registerUser).toHaveBeenCalledWith("t@g.com", "123456", "tomas");
        }));
        it("debería responder con error 400 si falla el registro", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedAuthService.registerUser.mockRejectedValueOnce(new Error("Error al registrar"));
            const response = yield (0, supertest_1.default)(app).post("/register").send({
                email: "t@g.com",
                password: "123456",
                name: "tomas",
            });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "Error al registrar" });
        }));
    });
    describe("POST /login", () => {
        it("debería iniciar sesión exitosamente", () => __awaiter(void 0, void 0, void 0, function* () {
            const date = new Date();
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
            const response = yield (0, supertest_1.default)(app).post("/login").send({
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
            expect(mockedAuthService.loginUser).toHaveBeenCalledWith("t@g.com", "123456");
        }));
        it("debería responder con error 401 si credenciales inválidas", () => __awaiter(void 0, void 0, void 0, function* () {
            mockedAuthService.loginUser.mockRejectedValueOnce(new Error("Credenciales inválidas"));
            const response = yield (0, supertest_1.default)(app).post("/login").send({
                email: "t@g.com",
                password: "wrongpassword",
            });
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: "Credenciales inválidas" });
        }));
    });
});
