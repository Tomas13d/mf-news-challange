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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNews = exports.improveText = exports.openai = void 0;
const openai_1 = require("openai");
exports.openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const improveText = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield exports.openai.responses.create({
        model: "gpt-4.1",
        instructions: "Eres un asistente que siempre responde en español. Mejora la gramática y ortografía del siguiente texto sin cambiar su significado. Responde solo con el texto corregido.",
        input: text,
    });
    return response.output_text.trim();
});
exports.improveText = improveText;
const generateRandomNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const systemMessage = "Eres un asistente que siempre responde en español. Debes responder SOLO con un JSON válido que describa una noticia deportiva ficticia en el siguiente formato:\n\n" +
        JSON.stringify({
            title: "string",
            body: "string (máximo 300 caracteres)",
            imageUrl: "string (URL válida)",
            author: "string",
            date: "string (fecha ISO 8601)",
            category: "Fútbol | NBA | Tenis",
            summary: "string (máximo 150 caracteres)",
        }, null, 2) +
        "\nNo agregues nada fuera del JSON.";
    const userPrompt = "Crea una noticia deportiva basada en las últimas novedades de Fútbol, NBA o Tenis. Elige una categoría aleatoriamente y crea un texto realista.";
    const response = yield exports.openai.responses.create({
        model: "gpt-4.1",
        instructions: systemMessage,
        input: userPrompt,
    });
    try {
        // La salida debería ser JSON válido, pero por seguridad parseamos
        const parsed = JSON.parse(response.output_text);
        return parsed;
    }
    catch (error) {
        throw new Error("Error al parsear la respuesta JSON de OpenAI: " +
            error +
            "\nRespuesta cruda: " +
            response.output_text);
    }
});
exports.generateRandomNews = generateRandomNews;
