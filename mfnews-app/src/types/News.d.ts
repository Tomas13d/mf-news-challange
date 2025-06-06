export interface News {
  id: Number;
  title: string;
  body: string;
  imageUrl: string;
  author: string;
  date: string;
  // Algunas adicionales
  category: string;
  summary: string;
}

export type Categories = "NBA" | "Fútbol" | "Tenis";
