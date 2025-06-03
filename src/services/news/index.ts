import prisma from "../../prisma/client";
import { News } from "../../generated/prisma";

export const getAllNews = () => prisma.news.findMany();

export const getNewsById = (id: number) =>
  prisma.news.findUnique({
    where: { id },
  });

export const createNews = (data: Omit<News, "id">) =>
  prisma.news.create({
    data,
  });

export const updateNews = (id: number, data: Partial<Omit<News, "id">>) =>
  prisma.news.update({
    where: { id },
    data,
  });

export const deleteNews = (id: number) =>
  prisma.news.delete({
    where: { id },
  });

export const searchNews = (query: string) =>
  prisma.news.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { author: { contains: query, mode: "insensitive" } },
      ],
    },
  });
