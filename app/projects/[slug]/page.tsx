import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";

type RouteParams = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.image }],
      type: "article",
    },
  };
}

export default async function ProjectDetail({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <article>
      <header style={{ marginBottom: 24 }}>
        <h1 className="page-title" style={{ marginBottom: 8 }}>
          {project.title}
        </h1>
        <p className="section-subtitle">{project.summary}</p>
      </header>

      <div style={{ border: "2px solid var(--accent-color)", background: "var(--bg-color)", padding: 8, marginBottom: 20 }}>
        <Image src={project.image} alt={project.title} width={1200} height={630} />
      </div>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginBottom: 24 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-roboto-mono)", marginBottom: 8 }}>KEY DETAILS</h3>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: 1.8 }}>
            <li><strong>CATEGORY:</strong> {project.category}</li>
            <li><strong>ROLE:</strong> Lead Technologist, R&D Specialist</li>
            <li><strong>TECHNOLOGIES:</strong> Arduino, Python, IoT, AI</li>
            <li><strong>OUTCOME:</strong> 25% Increase in Dwell Time</li>
          </ul>
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-roboto-mono)", marginBottom: 8 }}>THE CHALLENGE</h3>
          <p style={{ lineHeight: 1.8 }}>
            The flagship retail store faced a common challenge: engaging customers in a deep, memorable way and preventing passive browsing. We transformed key zones into interactive experiences with custom IoT devices and AI-driven feedback.
          </p>
        </div>
      </section>

      <section style={{ lineHeight: 1.8, marginBottom: 24 }}>
        <h3 style={{ fontFamily: "var(--font-roboto-mono)", marginBottom: 8 }}>PROCESS & SOLUTION</h3>
        <p>
          Our process began by mapping customer journeys to identify high-impact interaction points. We architected a network of devices that responded to presence and motion, turning passive displays into dynamic environments.
        </p>
      </section>

      <nav style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
        <Link className="hero-button" href="/projects">← BACK TO PROJECTS</Link>
        <Link className="hero-button" href="/">HOME →</Link>
      </nav>
    </article>
  );
}


