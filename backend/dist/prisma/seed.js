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
// prisma/seed.ts
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const newsData = [
    {
        category: "Fútbol",
        title: "Lamine Yamal: 'Soñaba con jugar un clásico' confiesa la joven promesa",
        author: "MARIO JIMÉNEZ",
        date: "2025-05-28T18:00:00.000Z",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuhtD4lcNT9g47LcFEAmYN_fFoWHtrCf1f9copZIUAjdEzaYSlueF6IabUEAKF6GWBG8g7RpOMHxOJbMjR4H3lkw",
        summary: "El joven talento azulgrana se muestra ilusionado ante su primer clásico como titular.",
        body: "Lamine Yamal, la joven promesa del FC Barcelona, ha confesado que 'soñaba con jugar un clásico' desde pequeño. A sus 16 años, el extremo se prepara para vivir su primer gran duelo contra el Real Madrid como titular, después de haber debutado con la selección española y haberse consolidado en el once de Xavi Hernández.",
    },
    {
        category: "NBA",
        title: "LeBron James alcanza nuevo récord de triples-dobles en la temporada",
        author: "JULIA MARTÍNEZ",
        date: "2025-05-15T20:30:00.000Z",
        imageUrl: "https://img.olympics.com/images/image/private/t_social_share_thumb/f_auto/v1672757509/primary/n8oqmhtvrf9lc6hkszlj",
        summary: "La estrella de Los Angeles Lakers continúa haciendo historia con una actuación espectacular.",
        body: "LeBron James ha logrado un nuevo récord de triples-dobles esta temporada, demostrando su gran versatilidad y liderazgo en la cancha que sigue haciendo historia en la NBA.",
    },
    {
        category: "Tenis",
        title: "Carlos Alcaraz gana su tercer título Masters 1000 en Roma",
        author: "ANA PÉREZ",
        date: "2025-04-30T16:00:00.000Z",
        imageUrl: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2025/06/02/17488537884154.jpg",
        summary: "El joven español reafirma su dominio en la tierra batida italiana.",
        body: "Carlos Alcaraz ha ganado su tercer título Masters 1000 tras una brillante actuación en Roma, consolidándose como uno de los mejores jugadores de la nueva generación.",
    },
    {
        category: "Fútbol",
        title: "Real Madrid anuncia fichaje sorpresa para la próxima temporada",
        author: "JORGE LÓPEZ",
        date: "2025-04-20T14:15:00.000Z",
        imageUrl: "https://shop.realmadrid.com/_next/image?url=https%3A%2F%2Flegends.broadleafcloud.com%2Fapi%2Fasset%2Fcontent%2FGENERICO.jpg%3FcontextRequest%3D%257B%2522forceCatalogForFetch%2522%3Afalse%2C%2522forceFilterByCatalogIncludeInheritance%2522%3Afalse%2C%2522forceFilterByCatalogExcludeInheritance%2522%3Afalse%2C%2522applicationId%2522%3A%252201H4RD9NXMKQBQ1WVKM1181VD8%2522%2C%2522tenantId%2522%3A%2522REAL_MADRID%2522%257D&w=1920&q=75",
        summary: "El club blanco refuerza su plantilla con un jugador internacional de renombre.",
        body: "Real Madrid ha anunciado la incorporación de un nuevo jugador estrella para la próxima temporada, sorprendiendo a sus seguidores con este fichaje inesperado.",
    },
    {
        category: "NBA",
        title: "Golden State Warriors se coronan campeones tras un intenso séptimo partido",
        author: "MARTA RUIZ",
        date: "2025-04-10T21:00:00.000Z",
        imageUrl: "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2025-06/nba-plain--d552b062-305f-4cfd-a114-b830bb1e90d7%281%29.png.webp?itok=rBNQjdNs",
        summary: "Stephen Curry lidera a los Warriors para conquistar otro título de la NBA.",
        body: "Los Golden State Warriors se han coronado campeones tras un intenso séptimo partido, con Stephen Curry brillando como máximo anotador y líder del equipo.",
    },
    {
        category: "Tenis",
        title: "Serena Williams confirma su retiro tras 25 años de carrera",
        author: "LUIS FERNÁNDEZ",
        date: "2025-03-25T10:00:00.000Z",
        imageUrl: "https://s3.amazonaws.com/rtvc-assets-senalcolombia.gov.co/s3fs-public/field/image/leyendas-deportes-serena-williams.jpg",
        summary: "La leyenda del tenis mundial anuncia su despedida en un emotivo comunicado.",
        body: "Serena Williams ha anunciado su retiro oficial del tenis profesional después de 25 años de carrera, dejando un legado imborrable en el deporte.",
    },
    {
        category: "Fútbol",
        title: "Argentina prepara su alineación para el Mundial 2026",
        author: "MARCOS GONZÁLEZ",
        date: "2025-03-10T12:00:00.000Z",
        imageUrl: "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1209%2Fr1104518_1296x729_16%2D9.jpg",
        summary: "Lionel Scaloni prueba nuevas figuras en los amistosos previos a la cita mundialista.",
        body: "La selección argentina está preparando su alineación para el Mundial 2026, con Lionel Scaloni probando nuevos talentos en partidos amistosos para definir el equipo.",
    },
    {
        category: "NBA",
        title: "Draft NBA 2025: Los 5 picks más prometedores",
        author: "CARLOS RAMÍREZ",
        date: "2025-02-28T18:00:00.000Z",
        imageUrl: "https://wfnz.com/wp-content/uploads/sites/86/2025/05/17471532202872.jpg?w=1024&strip=all&quality=80",
        summary: "Análisis de los jóvenes talentos que podrían cambiar el rumbo de sus franquicias.",
        body: "El Draft NBA 2025 ha presentado varios jugadores prometedores que podrían cambiar el futuro de sus equipos con su talento y habilidades.",
    },
    {
        category: "Tenis",
        title: "Djokovic gana su 25º Grand Slam y marca historia",
        author: "ISABEL SANTOS",
        date: "2025-02-15T15:00:00.000Z",
        imageUrl: "https://www.atptour.com/-/media/2024-images/news/2025/06/04/22/07/djokovic-roland-garros-2025-qf-smile.jpg",
        summary: "Novak Djokovic supera récords y se acerca a ser el máximo ganador de todos los tiempos.",
        body: "Con su 25º Grand Slam, Novak Djokovic ha establecido un nuevo récord, consolidando su lugar entre los mejores tenistas de la historia.",
    },
    {
        category: "Fútbol",
        title: "Manchester City renueva contrato a Pep Guardiola hasta 2027",
        author: "ANA TORRES",
        date: "2025-01-30T11:30:00.000Z",
        imageUrl: "https://a.espncdn.com/photo/2025/0525/r1498056_1296x518_5-2.jpg",
        summary: "El club reafirma la confianza en su entrenador para mantener la hegemonía.",
        body: "Manchester City ha renovado el contrato de Pep Guardiola hasta 2027, mostrando su compromiso con la continuidad y éxito del equipo bajo su dirección.",
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.news.createMany({
            data: newsData,
        });
        console.log("🌱 Seeding completado con 10 registros");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
