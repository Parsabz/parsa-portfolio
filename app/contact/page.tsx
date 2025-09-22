import type { Metadata } from "next";
import { getContactContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Parsa Bozorgani for collaborations and new ventures.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const contact = await getContactContent();
  return (
    <section>
      <h1 className="page-title">{contact.title}</h1>
      <p className="section-subtitle">{contact.headline.replace("'", "&#39;")}</p>
      <p style={{ lineHeight: 1.8, marginBottom: 20 }}>
        {contact.intro.replace("'", "&#39;")}
      </p>
      <ul style={{ listStyle: "none", padding: 0, lineHeight: 2 }}>
        <li><strong>EMAIL:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
        <li><strong>LINKEDIN:</strong> <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin.replace("https://", "")}</a></li>
      </ul>
      <div style={{ marginTop: 20 }}>
        <a className="hero-button" href={`mailto:${contact.email}`}>{contact.cta}</a>
      </div>
    </section>
  );
}


