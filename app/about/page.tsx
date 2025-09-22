import type { Metadata } from "next";
import { getAboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Parsa Bozorgani — journey from filmmaking to building immersive, AI-driven digital experiences.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const about = await getAboutContent();
  return (
    <section>
      <h1 className="page-title">{about.title}</h1>
      <div style={{ marginBottom: 20 }}>
        <p className="section-subtitle">{about.hero}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        <div style={{ border: "2px solid var(--accent-color)", background: "var(--bg-color)", height: 320 }} aria-hidden />
        <div style={{ lineHeight: 1.8 }}>
          <p>{about.journey}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
            {about.skills.map((s) => (
              <div key={s.section}>
                <h3 style={{ fontFamily: "var(--font-roboto-mono)", marginBottom: 8 }}>{s.section}</h3>
                <p>{s.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


