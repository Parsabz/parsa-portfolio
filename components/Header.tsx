"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-left">
        <span className="logo-box">PB</span>
        <span>PROJECTS / ABOUT / CONTACT</span>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <Link className={`nav-link ${isActive(pathname, "/projects") ? "active" : ""}`} href="/projects">
              PROJECTS
            </Link>
          </li>
          <li>
            <Link className={`nav-link ${isActive(pathname, "/about") ? "active" : ""}`} href="/about">
              ABOUT
            </Link>
          </li>
          <li>
            <Link className={`nav-link ${isActive(pathname, "/contact") ? "active" : ""}`} href="/contact">
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header-right" aria-hidden>
        {/* simple magnifier glyph to avoid external deps */}
        <span role="img" aria-label="Search">🔍</span>
      </div>
    </header>
  );
}


