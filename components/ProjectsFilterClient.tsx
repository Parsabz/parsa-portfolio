"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectContent } from "@/lib/content";

export default function ProjectsFilterClient({
  filters,
  projects,
}: {
  filters: string[];
  projects: ProjectContent[];
}) {
  const [active, setActive] = useState<string>(filters[0] || "ALL");
  const filtered = useMemo(() => {
    if (active === "ALL") return projects;
    return projects.filter((p) => p.category === (active as unknown as ProjectContent["category"]));
  }, [active, projects]);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Project filters">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            className={`filter-btn ${active === f ? "active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}


