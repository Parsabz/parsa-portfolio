import Image from "next/image";
import Link from "next/link";
import type { ProjectContent } from "@/lib/content";

export default function ProjectCard({ project }: { project: ProjectContent }) {
  return (
    <article className="project-card">
      <div className="project-header">PROJECT TITLE / OUTCOME</div>
      <div className="image-container">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text-container">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div style={{ marginTop: 12 }}>
          <Link className="hero-button" href={`/projects/${project.slug}`}>
            VIEW CASE STUDY →
          </Link>
        </div>
      </div>
    </article>
  );
}


