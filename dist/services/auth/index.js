"use strict";
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
exports.loginUser = exports.registerUser = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const registerUser = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield client_1.default.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("User already exists");
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    return client_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Invalid credentials");
    const valid = yield bcrypt_1.default.compare(password, user.password);
    if (!valid)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
    });
    return { user, token };
});
exports.loginUser = loginUser;
