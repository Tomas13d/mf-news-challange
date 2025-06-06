import prisma from "../../prisma/client";
import { News } from "../../generated/prisma";

// Obtener todas las noticias
export const getAllNews = () =>
  prisma.news.findMany({
    orderBy: {
      date: "desc",
    },
  });

// Obtener una noticia por ID
export const getNewsById = (id: number) =>
  prisma.news.findUnique({
    where: { id },
  });

// Crear noticia
export const createNews = (data: Omit<News, "id">) =>
  prisma.news.create({
    data,
  });

// Obtener noticias por categoría
export const getNewsByCategory = (category: string) =>
  prisma.news.findMany({
    where: {
      category: {
        equals: category,
        mode: "insensitive",
      },
    },
    orderBy: {
      date: "desc",
    },
  });

// Buscar noticias por título o autor
export const searchNews = (query: string) =>
  prisma.news.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { author: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      date: "desc",
    },
  });

// Actualizar noticia
export const updateNews = (id: number, data: Partial<Omit<News, "id">>) =>
  prisma.news.update({
    where: { id },
    data,
  });

// Eliminar noticia
export const deleteNews = (id: number) =>
  prisma.news.delete({
    where: { id },
  });
