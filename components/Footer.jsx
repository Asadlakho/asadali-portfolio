import { site } from "../lib/data";
import { wrap } from "./ui";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line py-7 text-[15px] text-muted">
      <div className={`${wrap} flex flex-wrap justify-between gap-3`}>
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="flex gap-4"><a href={site.github} className="hover:text-accent">GitHub</a><a href={site.linkedin} className="hover:text-accent">LinkedIn</a><a href={`mailto:${site.email}`} className="hover:text-accent">Email</a></span>
      </div>
    </footer>
  );
}
