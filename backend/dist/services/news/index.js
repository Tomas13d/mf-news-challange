"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.updateNews = exports.searchNews = exports.getNewsByCategory = exports.createNews = exports.getNewsById = exports.getAllNews = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
// Obtener todas las noticias
const getAllNews = () => client_1.default.news.findMany({
    orderBy: {
        date: "desc",
    },
});
exports.getAllNews = getAllNews;
// Obtener una noticia por ID
const getNewsById = (id) => client_1.default.news.findUnique({
    where: { id },
});
exports.getNewsById = getNewsById;
// Crear noticia
const createNews = (data) => client_1.default.news.create({
    data,
});
exports.createNews = createNews;
// Obtener noticias por categoría
const getNewsByCategory = (category) => client_1.default.news.findMany({
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
exports.getNewsByCategory = getNewsByCategory;
// Buscar noticias por título, autor o categoría
const searchNews = (query) => client_1.default.news.findMany({
    where: {
        OR: [
            { title: { contains: query, mode: "insensitive" } },
            { author: { contains: query, mode: "insensitive" } },
            { category: { contains: query, mode: "insensitive" } },
        ],
    },
    orderBy: {
        date: "desc",
    },
});
exports.searchNews = searchNews;
// Actualizar noticia
const updateNews = (id, data) => client_1.default.news.update({
    where: { id },
    data,
});
exports.updateNews = updateNews;
// Eliminar noticia
const deleteNews = (id) => client_1.default.news.delete({
    where: { id },
});
exports.deleteNews = deleteNews;
