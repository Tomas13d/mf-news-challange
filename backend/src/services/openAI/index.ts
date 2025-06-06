import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const improveText = async (text: string): Promise<string> => {
  const response = await openai.responses.create({
    model: "gpt-4.1",
    instructions:
      "Eres un asistente que siempre responde en español. Mejora la gramática y ortografía del siguiente texto sin cambiar su significado. Responde solo con el texto corregido.",
    input: text,
  });

  return response.output_text.trim();
};

export interface NewsArticle {
  title: string;
  body: string;
  imageUrl: string;
  author: string;
  date: string; // ISO string
  category: "Fútbol" | "NBA" | "Tenis";
  summary: string;
}

export const generateRandomNews = async (): Promise<NewsArticle> => {
  const systemMessage =
    "Eres un asistente que siempre responde en español. Debes responder SOLO con un JSON válido que describa una noticia deportiva ficticia en el siguiente formato:\n\n" +
    JSON.stringify(
      {
        title: "string",
        body: "string (máximo 300 caracteres)",
        imageUrl: "string (URL válida)",
        author: "string",
        date: "string (fecha ISO 8601)",
        category: "Fútbol | NBA | Tenis",
        summary: "string (máximo 150 caracteres)",
      },
      null,
      2
    ) +
    "\nNo agregues nada fuera del JSON.";

  const userPrompt =
    "Crea una noticia deportiva basada en las últimas novedades de Fútbol, NBA o Tenis. Elige una categoría aleatoriamente y crea un texto realista.";

  const response = await openai.responses.create({
    model: "gpt-4.1",
    instructions: systemMessage,
    input: userPrompt,
  });

  try {
    // La salida debería ser JSON válido, pero por seguridad parseamos
    const parsed: NewsArticle = JSON.parse(response.output_text);
    return parsed;
  } catch (error) {
    throw new Error(
      "Error al parsear la respuesta JSON de OpenAI: " +
        error +
        "\nRespuesta cruda: " +
        response.output_text
    );
  }
};
