import ProjectsFilterClient from "../../components/ProjectsFilterClient";
import { FILTERS, getAllProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  return (
    <section>
      <h1 className="page-title">PROJECTS</h1>
      <ProjectsFilterClient filters={FILTERS as unknown as string[]} projects={projects} />
    </section>
  );
}


