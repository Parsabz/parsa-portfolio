import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects, getHomeContent } from "@/lib/content";

export default async function Home() {
  const [home, featured] = await Promise.all([
    getHomeContent(),
    getFeaturedProjects(3),
  ]);
  return (
    <>
      <section className="hero">
        <h1>{home.title}</h1>
        <h2>{home.tagline}</h2>
        <p>{home.value}</p>
        <Link href="/projects" className="hero-button">
          {home.cta}
        </Link>
        <div className="graph-container" aria-hidden>
          <div className="graph-segment" style={{ height: "60%" }} />
          <div className="graph-segment" style={{ height: "70%" }} />
          <div className="graph-segment" style={{ height: "70%" }} />
          <div className="graph-segment" style={{ height: "50%" }} />
          <div className="graph-segment" style={{ height: "50%" }} />
          <div className="graph-segment" style={{ height: "65%" }} />
          <div className="graph-segment" style={{ height: "65%" }} />
          <div className="graph-segment" style={{ height: "80%" }} />
          <div className="graph-segment" style={{ height: "80%" }} />
          <div className="graph-segment" style={{ height: "60%" }} />
          <div className="graph-segment" style={{ height: "60%" }} />
          <div className="graph-segment" style={{ height: "40%" }} />
          <div className="graph-segment" style={{ height: "40%" }} />
          <div className="graph-segment" style={{ height: "55%" }} />
        </div>
      </section>

      <section className="projects">
        <div className="project-grid">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
