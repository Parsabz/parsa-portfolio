import { promises as fs } from "fs";
import path from "path";

export type Category =
  | "GENERATIVE AI"
  | "WEB3"
  | "IMMERSIVE EXPERIENCES"
  | "FILM"
  | "OTHER";

export const FILTERS = [
  "ALL",
  "GENERATIVE AI",
  "WEB3",
  "IMMERSIVE EXPERIENCES",
  "FILM",
  "OTHER",
] as const;

export type HomeContent = {
  title: string;
  tagline: string;
  value: string;
  cta: string;
};

export type AboutContent = {
  title: string;
  hero: string;
  journey: string;
  skills: { section: string; items: string }[];
};

export type ContactContent = {
  title: string;
  headline: string;
  intro: string;
  email: string;
  linkedin: string;
  cta: string;
};

export type ProjectContent = {
  slug: string;
  title: string;
  summary: string;
  category: Category;
  image: string; // can be external URL or /uploads path
  featured?: boolean;
};

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, "content");

async function readJsonFile<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content) as T;
}

export async function getHomeContent(): Promise<HomeContent> {
  const file = path.join(CONTENT_DIR, "pages", "home.json");
  return readJsonFile<HomeContent>(file);
}

export async function getAboutContent(): Promise<AboutContent> {
  const file = path.join(CONTENT_DIR, "pages", "about.json");
  return readJsonFile<AboutContent>(file);
}

export async function getContactContent(): Promise<ContactContent> {
  const file = path.join(CONTENT_DIR, "pages", "contact.json");
  return readJsonFile<ContactContent>(file);
}

export async function getAllProjects(): Promise<ProjectContent[]> {
  const dir = path.join(CONTENT_DIR, "projects");
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const projects = await Promise.all(
    files
      .filter((f) => f.endsWith(".json"))
      .map(async (filename) => {
        const filePath = path.join(dir, filename);
        const data = await readJsonFile<Omit<ProjectContent, "slug">>(filePath);
        const slug = filename.replace(/\.json$/, "");
        return { slug, ...data } satisfies ProjectContent;
      })
  );
  // sort by title for stable order
  return projects.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectContent[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<ProjectContent | undefined> {
  const file = path.join(CONTENT_DIR, "projects", `${slug}.json`);
  try {
    const data = await readJsonFile<Omit<ProjectContent, "slug">>(file);
    return { slug, ...data } satisfies ProjectContent;
  } catch {
    return undefined;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, "projects");
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
  } catch {
    return [];
  }
}


