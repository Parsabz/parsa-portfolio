import type { Metadata } from "next";
import { Anton, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parsa Bozorgani — Architect of Digital Realities",
    template: "%s | Parsa Bozorgani",
  },
  description:
    "I build market-ready digital products and immersive experiences at the intersection of generative art, Web3, and emerging technology.",
  keywords: [
    "Parsa Bozorgani",
    "Architect of Digital Realities",
    "Generative Art",
    "Web3",
    "AI",
    "Immersive Experiences",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Parsa Bozorgani — Architect of Digital Realities",
    description:
      "I build market-ready digital products and immersive experiences at the intersection of generative art, Web3, and emerging technology.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Parsa Bozorgani Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parsa Bozorgani — Architect of Digital Realities",
    description:
      "I build market-ready digital products and immersive experiences at the intersection of generative art, Web3, and emerging technology.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Parsa Bozorgani",
    url: siteUrl,
    jobTitle: "Architect of Digital Realities",
    sameAs: [
      "https://www.linkedin.com/in/parsabozorgani",
    ],
    description:
      "I build market-ready digital products and immersive experiences at the intersection of generative art, Web3, and emerging technology.",
  };

  return (
    <html lang="en">
      <body className={`${anton.variable} ${robotoMono.variable}`}>
        <div className="container">
          <Header />
          <main className="site-main">{children}</main>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
