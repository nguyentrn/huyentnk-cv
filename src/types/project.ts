// src/types/project.ts

export interface Category {
  name: string;
  slug: string;
}

export interface Project {
  slug: string;
  name: string;
  designation: string;
  categorySlug: "strategy" | "content" | "analysis";
  quote: string;
  src: string;
  heroImage: string;
  overview: string;
  details: { label: string; value: string }[];
  content: string;
}
