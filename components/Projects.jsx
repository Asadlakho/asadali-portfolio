
"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import {
  ArrowUpRight,
  ExternalLink,
  Layers,
  Star,
  ChevronDown,
} from "lucide-react";

import { projects } from "../lib/data";
import { wrap, card, Tag, Head } from "./ui";

/* ---------------- Configuration ---------------- */

const SITE_URL = "https://developerasad-portfolio.netlify.app";
const GITHUB_URL = "https://github.com/Asadlakho";
const MAX_TAGS = 3;

/* ---------------- Helpers ---------------- */

function getSlug(project) {
  return (
    project.slug ||
    project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function getProjectImage(project) {
  if (project.image) {
    return project.image.startsWith("/") ||
      project.image.startsWith("http")
      ? project.image
      : `/projects/${project.image}`;
  }

  return `/projects/${getSlug(project)}.webp`;
}

function toAbsolute(url) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

function getHost(url) {
  if (!url) return "";

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/* ---------------- SEO ---------------- */

function ProjectsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web development projects by Asad Ali Lakho",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.desc,
        image: toAbsolute(getProjectImage(project)),
        url: project.live || project.code || `${SITE_URL}/#projects`,
        keywords: (project.tech || []).join(", "),
        author: {
          "@type": "Person",
          name: "Asad Ali Lakho",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* ---------------- Badges ---------------- */

function FeaturedBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-0.5 text-[9px] font-semibold text-white">
      <Star size={9} fill="currentColor" aria-hidden="true" />
      Featured
    </span>
  );
}

function StatusBadge({ label }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      {label}
    </span>
  );
}

/* ---------------- Image fallback ---------------- */

function PreviewFallback({ title }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-emerald-500/15 via-slate-900 to-teal-950 p-4">
      <div
        aria-hidden="true"
        className="w-full max-w-[75%] space-y-2 rounded-lg border border-white/10 bg-slate-900/90 p-3"
      >
        <div className="h-2 w-2/5 rounded bg-emerald-500/40" />
        <div className="grid grid-cols-3 gap-1.5">
          <div className="h-7 rounded bg-white/10" />
          <div className="h-7 rounded bg-white/10" />
          <div className="h-7 rounded bg-white/10" />
        </div>
        <div className="h-10 rounded bg-white/5" />
      </div>
      <span className="sr-only">{title} preview unavailable</span>
    </div>
  );
}

/* ---------------- Button styles ---------------- */

const primaryBtn =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 text-[11px] font-semibold text-white transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 motion-reduce:transition-none";

const secondaryBtn =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-white/25 bg-slate-900/90 px-3 py-2 text-[11px] font-semibold text-white transition-colors duration-150 hover:border-emerald-400/70 hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400";

/* ---------------- Animated Technology Tags ---------------- */

const TechnologyTags = memo(function TechnologyTags({ tech }) {
  const [expanded, setExpanded] = useState(false);

  const visibleTech = tech.slice(0, MAX_TAGS);
  const extraTech = tech.slice(MAX_TAGS);
  const extraCount = extraTech.length;

  return (
    <ul
      aria-label="Technologies used"
      className="mt-auto flex flex-wrap items-center gap-1.5"
    >
      {visibleTech.map((technology) => (
        <li key={technology} className="text-[10px]">
          <Tag>{technology}</Tag>
        </li>
      ))}

      {extraCount > 0 && (
        <li className="relative">
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={
              expanded
                ? "Hide additional technologies"
                : `Show ${extraCount} additional technologies`
            }
            onClick={() => setExpanded((previous) => !previous)}
            onMouseEnter={() => {}}
            className="group/toggle inline-flex cursor-pointer items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 transition-colors duration-150 hover:border-emerald-400/60 hover:bg-emerald-500/20 dark:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {expanded ? "Show less" : `+${extraCount}`}
            <ChevronDown
              size={11}
              aria-hidden="true"
              className={`transition-transform duration-200 ease-out ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div
            id={`extra-tech-${extraCount}`}
            className={`grid transition-[grid-template-rows,opacity,margin] duration-200 ease-out motion-reduce:transition-none ${
              expanded
                ? "mt-2 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <ul className="flex flex-wrap gap-1.5 pb-1">
                {extraTech.map((technology) => (
                  <li
                    key={technology}
                    className={`text-[10px] transition-[transform,opacity] duration-200 ${
                      expanded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    }`}
                  >
                    <Tag>{technology}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
});

/* ---------------- Project Card ---------------- */

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const [imageError, setImageError] = useState(false);

  const tech = project.tech || [];
  const primaryHref = project.live || project.code;
  const hasLinks = Boolean(primaryHref);
  const host = getHost(project.live);
  const image = getProjectImage(project);

  const altText = `${project.title} screenshot${
    tech.length ? ` - built with ${tech.slice(0, 3).join(", ")}` : ""
  }`;

  return (
    <li className="h-full min-w-0">
      <article
        className={`${card} group relative flex h-full min-w-0 flex-col overflow-hidden !rounded-xl !p-0 transition-[border-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-[0_8px_22px_rgba(16,185,129,0.08)] focus-within:border-emerald-500/50 motion-reduce:transform-none motion-reduce:transition-none`}
        itemScope
        itemType="https://schema.org/CreativeWork"
      >
        {/* Browser bar */}

        <div className="flex min-w-0 items-center gap-1.5 border-b border-white/10 bg-slate-900 px-2.5 py-2">
          <span className="flex shrink-0 gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
          </span>

          <span className="min-w-0 flex-1 truncate rounded bg-white/5 px-2 py-1 text-[10px] text-white/55">
            {host || "Project preview"}
          </span>

          {project.featured && <FeaturedBadge />}

          {project.status ? (
            <StatusBadge label={project.status} />
          ) : (
            project.live && <StatusBadge label="Live" />
          )}
        </div>

        {/* Project screenshot */}

        <div
          className={`relative aspect-[16/10] overflow-hidden bg-slate-900 ${
            hasLinks ? "cursor-pointer" : ""
          }`}
        >
          {!imageError ? (
            <Image
              src={image}
              alt={altText}
              fill
              priority={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              quality={75}
              className="object-cover object-top transition-[object-position] duration-500 ease-out group-hover:object-bottom motion-reduce:transition-none"
              onError={() => setImageError(true)}
              itemProp="image"
            />
          ) : (
            <PreviewFallback title={project.title} />
          )}

          {/* Clickable screenshot */}

          {primaryHref && (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="absolute inset-0 z-[2] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
            />
          )}

          {/* Hover overlay */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[3] bg-slate-950/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:hidden motion-reduce:transition-none"
          />

          {/* Desktop actions */}

          {hasLinks && (
            <div className="pointer-events-none absolute inset-0 z-[4] hidden items-center justify-center px-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:hover)]:flex">
              <div className="pointer-events-none flex flex-wrap items-center justify-center gap-2 group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live`}
                    className={primaryBtn}
                  >
                    <ExternalLink size={12} aria-hidden="true" />
                    View Project
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                )}

                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code`}
                    className={secondaryBtn}
                  >
                    <FaGithub size={12} aria-hidden="true" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Project information */}

        <div className="flex flex-1 flex-col gap-2.5 p-3.5 sm:p-4">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            {project.category ? (
              <span className="inline-flex min-w-0 items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <Layers size={12} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{project.category}</span>
              </span>
            ) : (
              <span />
            )}

            {project.year && (
              <time
                dateTime={String(project.year)}
                className="shrink-0 text-muted"
              >
                {project.year}
              </time>
            )}
          </div>

          <h3
            className="font-display text-base font-bold leading-snug tracking-tight text-fg sm:text-[17px]"
            itemProp="name"
          >
            {primaryHref ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer outline-none transition-colors duration-150 hover:text-emerald-500 focus-visible:underline"
              >
                {project.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              project.title
            )}
          </h3>

          {project.desc && (
            <p
              className="line-clamp-2 min-h-[2.4rem] text-xs leading-relaxed text-muted"
              itemProp="description"
            >
              {project.desc}
            </p>
          )}

          {/* Animated +N technology tags */}

          {tech.length > 0 && <TechnologyTags tech={tech} />}

          {/* Touch devices: links stay visible */}

          {hasLinks && (
            <div className="hidden flex-wrap items-center gap-2 border-t border-line pt-3 [@media(hover:none)]:flex">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryBtn}
                  aria-label={`View ${project.title} live`}
                >
                  <ExternalLink size={12} aria-hidden="true" />
                  Live Demo
                </a>
              )}

              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[11px] font-semibold text-fg transition-colors duration-150 hover:border-emerald-500/50"
                  aria-label={`View ${project.title} source code`}
                >
                  <FaGithub size={12} aria-hidden="true" />
                  Source Code
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </li>
  );
});

/* ---------------- Projects Section ---------------- */

export default function Projects() {
  if (!Array.isArray(projects) || projects.length === 0) {
    return null;
  }

  return (
    <section
      className={`${wrap} relative isolate pt-20 sm:pt-24`}
      aria-label="Web development portfolio projects"
    >
      <ProjectsSchema />

      <Head
        id="projects"
        title="Projects"
        sub="Selected work across the MERN stack."
      />

      {/* Responsive 1 / 2 / 3-column grid */}

      <ul
        role="list"
        className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug || project.title}
            project={project}
            index={index}
          />
        ))}
      </ul>

      {/* GitHub CTA */}

      <div className="mt-10 flex justify-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${card} group inline-flex cursor-pointer items-center gap-3 px-5 py-3 text-sm font-semibold text-emerald-600 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-emerald-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400 motion-reduce:transition-none`}
        >
          <FaGithub size={18} aria-hidden="true" />
          Explore more projects on GitHub
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </section>
  );
}
