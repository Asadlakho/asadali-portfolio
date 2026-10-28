"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  GitBranch,
  Globe,
  Layers,
  LayoutGrid,
  Lock,
  Monitor,
  Palette,
  Radio,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Triangle,
  X,
} from "lucide-react";

import { experience } from "../lib/data";
import { wrap, Head } from "./ui";

/* -------------------------------------------------------
   CONFIGURATION
------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const FILTERS = ["All", "Development", "Internship", "AI", "Other"];

const TYPEWRITER_WORDS = [
  "Professional Experience",
  "Full-Stack Development",
  "Certifications & Credentials",
];

const IMAGE_CERTIFICATES = [
  {
    id: "mern-full-stack-developer",
    title: "Certified MERN Full Stack Developer",
    issuer: "Skills Education",
    category: "Development",
    image: "/certificates/Certified%20Developer-Certificate.jpg",
    description:
      "MERN Full Stack Developer certification awarded with an A+ grade.",
    status: "Certified",
    grade: "A+",
    featured: true,
  },
  {
    id: "skills-education-internship",
    title: "Full Stack Development Internship",
    issuer: "Skills Education",
    category: "Internship",
    image: "/certificates/Skills_Education.jpg",
    description:
      "Certificate confirming completion of the Skills Education internship.",
    status: "Completed",
    featured: true,
  },
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    issuer: "Google",
    category: "AI",
    image: "/certificates/GoogleAIEssentialsV1_Badge2026.jpg",
    description:
      "Google AI Essentials learning credential covering practical AI concepts and applications.",
    status: "Certified",
  },
  {
    id: "iit-solution-internship",
    title: "Web Development Internship",
    issuer: "IIT Solutions",
    category: "Internship",
    image: "/certificates/IIT%20Solution%20Internship.jpg",
    description:
      "Internship certificate recognizing web development experience at IIT Solutions.",
    status: "Completed",
  },
  {
    id: "softlexify-internship",
    title: "Full Stack Developer Internship",
    issuer: "Softlexify Zone",
    category: "Internship",
    image: "/certificates/Softlexify_Certificate_SZ-INT-2026-0007.png",
    description:
      "Certificate confirming full-stack development internship experience at Softlexify Zone.",
    status: "Completed",
  },
  {
    id: "certificate-of-appreciation",
    title: "Certificate of Appreciation",
    issuer: "Professional Recognition",
    category: "Other",
    image: "/certificates/Appreciation%20certificate.jpg",
    description:
      "Certificate of appreciation recognizing contribution and professional effort.",
    status: "Certified",
  },
  {
    id: "ai-full-stack-developer",
    title: "AI Full Stack Developer",
    issuer: "Professional Learning",
    category: "Development",
    image: "/certificates/professional-developer.png",
    description: "Professional credential issued by Professional Learning.",
    status: "Certified",
    featured: true,
  },
];

/*
  Verification links can be added here when available.

  Example:
  "mern-full-stack-developer": "https://example.com/verify/123"
*/
const CERTIFICATE_LINKS = {};

/* -------------------------------------------------------
   CORE TECHNOLOGIES
------------------------------------------------------- */

const CORE_TECHNOLOGIES = [
  { name: "JavaScript", category: "Frontend", icon: Code2 },
  { name: "TypeScript", category: "Frontend", icon: FileText },
  { name: "React.js", category: "Frontend", icon: Layers },
  { name: "Next.js", category: "Frontend", icon: Triangle },
  { name: "Tailwind CSS", category: "Frontend", icon: Palette },
  { name: "HTML & CSS", category: "Frontend", icon: LayoutGrid },
  { name: "Node.js", category: "Backend", icon: Server },
  { name: "Express.js", category: "Backend", icon: Terminal },
  { name: "REST APIs", category: "Backend", icon: Globe },
  { name: "MongoDB", category: "Database", icon: Database },
  { name: "PostgreSQL", category: "Database", icon: Database },
  { name: "Git", category: "Tools", icon: GitBranch },
  { name: "GitHub", category: "Tools", icon: GitBranch },
  { name: "AI Integration", category: "AI", icon: Sparkles },
  { name: "Authentication", category: "Security", icon: ShieldCheck },
  { name: "bcrypt", category: "Security", icon: Lock },
  { name: "Docker", category: "Tools", icon: Monitor },
  { name: "Vercel", category: "Deployment", icon: Triangle },
  { name: "Netlify", category: "Deployment", icon: Globe },
  { name: "Socket.io", category: "Backend", icon: Radio },
];

/* -------------------------------------------------------
   HELPERS
------------------------------------------------------- */

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

function getCertificateDetails(certificate, index = 0) {
  const title =
    certificate.title ||
    certificate.name ||
    certificate.label ||
    "Professional Certificate";

  const issuer =
    certificate.issuer ||
    certificate.organization ||
    certificate.provider ||
    certificate.company ||
    "Professional Learning";

  const image =
    certificate.image ||
    certificate.src ||
    certificate.imageUrl ||
    certificate.certificateImage ||
    "";

  const id =
    certificate.id ||
    certificate.slug ||
    `${normalize(title).replace(/\s+/g, "-")}-${index}`;

  const rawCategory = normalize(certificate.category || certificate.type || "");

  let category = "Other";

  if (
    rawCategory.includes("development") ||
    rawCategory.includes("mern") ||
    rawCategory.includes("programming") ||
    rawCategory.includes("web")
  ) {
    category = "Development";
  } else if (rawCategory.includes("intern")) {
    category = "Internship";
  } else if (
    rawCategory.includes("ai") ||
    rawCategory.includes("artificial")
  ) {
    category = "AI";
  }

  return {
    ...certificate,
    id,
    title,
    issuer,
    image,
    category,
    description:
      certificate.description ||
      certificate.summary ||
      `Professional credential issued by ${issuer}.`,
    url:
      certificate.url ||
      certificate.verifyUrl ||
      CERTIFICATE_LINKS[id] ||
      "",
    status:
      certificate.status || certificate.credentialStatus || "Certified",
    grade: certificate.grade || "",
  };
}

function matchesCategory(certificate, activeFilter) {
  if (activeFilter === "All") return true;

  return normalize(certificate.category) === normalize(activeFilter);
}

/* -------------------------------------------------------
   TYPEWRITER
------------------------------------------------------- */

function TypewriterText({ reducedMotion }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(TYPEWRITER_WORDS[0]);

  useEffect(() => {
    if (reducedMotion) {
      setText(TYPEWRITER_WORDS[0]);
      return undefined;
    }

    let characterIndex = 0;
    let deleting = false;
    let timeout;

    const type = () => {
      const currentWord = TYPEWRITER_WORDS[wordIndex];

      if (!deleting) {
        characterIndex += 1;
        setText(currentWord.slice(0, characterIndex));

        if (characterIndex >= currentWord.length) {
          deleting = true;
          timeout = setTimeout(type, 1500);
          return;
        }

        timeout = setTimeout(type, 48);
        return;
      }

      characterIndex -= 1;
      setText(currentWord.slice(0, characterIndex));

      if (characterIndex <= 0) {
        deleting = false;

        setWordIndex((previous) => (previous + 1) % TYPEWRITER_WORDS.length);

        timeout = setTimeout(() => {
          characterIndex = 0;
          type();
        }, 250);

        return;
      }

      timeout = setTimeout(type, 25);
    };

    timeout = setTimeout(type, 900);

    return () => clearTimeout(timeout);
  }, [wordIndex, reducedMotion]);

  return (
    <span className="inline-flex min-h-6 items-center gap-1 text-sm font-medium text-emerald-400">
      <span>{text}</span>

      {!reducedMotion && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "linear",
          }}
          className="inline-block h-4 w-px bg-emerald-400"
        />
      )}
    </span>
  );
}

/* -------------------------------------------------------
   EXPERIENCE SECTION
------------------------------------------------------- */

export default function Experience() {
  const reducedMotion = useReducedMotion();

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  /*
   * Only the local image certificates are used here,
   * so no extra / duplicate card appears.
   */
  const certificateList = useMemo(() => {
    const unique = new Map();

    IMAGE_CERTIFICATES.forEach((certificate, index) => {
      const details = getCertificateDetails(certificate, index);
      unique.set(details.id, details);
    });

    return Array.from(unique.values());
  }, []);

  const filteredCertificates = useMemo(() => {
    const query = normalize(search);

    return certificateList.filter((certificate) => {
      const matchesSearch =
        !query ||
        normalize(certificate.title).includes(query) ||
        normalize(certificate.issuer).includes(query) ||
        normalize(certificate.category).includes(query) ||
        normalize(certificate.description).includes(query);

      return matchesSearch && matchesCategory(certificate, activeFilter);
    });
  }, [certificateList, search, activeFilter]);

  /* Position of the open certificate inside the visible list. */

  const selectedIndex = selected
    ? filteredCertificates.findIndex((item) => item.id === selected.id)
    : -1;

  const canNavigate = selectedIndex !== -1 && filteredCertificates.length > 1;

  const showAdjacent = useCallback(
    (step) => {
      if (selectedIndex === -1 || filteredCertificates.length < 2) return;

      const total = filteredCertificates.length;
      const nextIndex = (selectedIndex + step + total) % total;

      setSelected(filteredCertificates[nextIndex]);
    },
    [selectedIndex, filteredCertificates]
  );

  /* Keyboard: Escape closes, arrow keys move between certificates. */

  useEffect(() => {
    if (!selected) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      } else if (event.key === "ArrowRight") {
        showAdjacent(1);
      } else if (event.key === "ArrowLeft") {
        showAdjacent(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, showAdjacent]);

  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reducedMotion ? 0 : 0.45,
      delay: reducedMotion ? 0 : delay,
      ease: EASE,
    },
  });

  const clearSearch = () => {
    setSearch("");
    setActiveFilter("All");
  };

  return (
    <>
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="relative isolate overflow-hidden py-16 sm:py-20"
      >
        {/* Ambient background accents */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 top-24 h-72 w-72 rounded-full bg-emerald-500/[0.07] blur-[100px]" />
          <div className="absolute -right-40 top-[38%] h-80 w-80 rounded-full bg-sky-500/[0.06] blur-[110px]" />
        </div>

        <div className={wrap}>
          {/* Section heading */}

          <motion.div {...reveal()} className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-400">
                <Sparkles size={14} aria-hidden="true" />
                CAREER & CREDENTIALS
              </span>
            </div>

            <Head
              title="Experience & Credentials"
              subtitle="Practical experience, technical skills, and professional certifications."
            />

            <div id="experience-heading" className="mt-4">
              <TypewriterText reducedMotion={reducedMotion} />
            </div>
          </motion.div>

          {/* Professional Experience */}

          <motion.section
            {...reveal(0.05)}
            aria-labelledby="professional-experience-heading"
            className="mb-14"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-emerald-400">
                <Briefcase size={19} aria-hidden="true" />
              </div>

              <div>
                <h3
                  id="professional-experience-heading"
                  className="text-lg font-semibold tracking-tight text-fg"
                >
                  Professional Experience
                </h3>

                <p className="mt-0.5 text-sm text-muted">
                  Internships and practical development work
                </p>
              </div>
            </div>

            <div className="relative ml-2 space-y-4 border-l border-line pl-6 sm:ml-3 sm:pl-8">
              {(Array.isArray(experience) ? experience : []).map(
                (item, index) => {
                  const role =
                    item.role ||
                    item.position ||
                    item.title ||
                    "Development Experience";

                  const company =
                    item.company || item.organization || item.name || "";

                  const period =
                    item.period ||
                    item.duration ||
                    item.date ||
                    item.dates ||
                    "";

                  const location = item.location || "";

                  const description = item.description || item.summary || "";

                  const highlights = Array.isArray(item.highlights)
                    ? item.highlights
                    : Array.isArray(item.responsibilities)
                      ? item.responsibilities
                      : Array.isArray(item.achievements)
                        ? item.achievements
                        : [];

                  const technologies = Array.isArray(item.technologies)
                    ? item.technologies
                    : Array.isArray(item.skills)
                      ? item.skills
                      : [];

                  return (
                    <motion.article
                      key={item.id || `${company}-${role}-${index}`}
                      {...reveal(index * 0.04)}
                      className="group relative rounded-2xl border border-line bg-surface/70 p-4 transition-colors duration-300 hover:border-emerald-500/30 sm:p-5"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 border-emerald-400 bg-background shadow-[0_0_14px_rgba(52,211,153,0.2)] sm:-left-[39px]"
                      />

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h4 className="text-base font-semibold text-fg transition-colors group-hover:text-emerald-400">
                            {role}
                          </h4>

                          {company && (
                            <p className="mt-1 text-sm font-medium text-emerald-400">
                              {company}
                            </p>
                          )}

                          {(period || location) && (
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                              {period && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Calendar size={13} aria-hidden="true" />
                                  {period}
                                </span>
                              )}

                              {location && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Globe size={13} aria-hidden="true" />
                                  {location}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-muted">
                          <CheckCircle2 size={12} aria-hidden="true" />
                          Experience
                        </span>
                      </div>

                      {description && (
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {description}
                        </p>
                      )}

                      {highlights.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="flex gap-2 text-sm leading-6 text-muted"
                            >
                              <CheckCircle2
                                size={15}
                                className="mt-1 shrink-0 text-emerald-400"
                                aria-hidden="true"
                              />

                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {technologies.map((technology, technologyIndex) => (
                            <span
                              key={technologyIndex}
                              className="rounded-md border border-line bg-background/70 px-2 py-1 text-[11px] font-medium text-muted"
                            >
                              {typeof technology === "string"
                                ? technology
                                : technology.name || technology.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.article>
                  );
                }
              )}
            </div>
          </motion.section>

          {/* Core Technologies */}

          <motion.section
            {...reveal(0.08)}
            aria-labelledby="core-technologies-heading"
            className="mb-14"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-sky-400">
                  <Code2 size={19} aria-hidden="true" />
                </div>

                <div>
                  <h3
                    id="core-technologies-heading"
                    className="text-lg font-semibold tracking-tight text-fg"
                  >
                    Core Technologies
                  </h3>

                  <p className="mt-0.5 text-sm text-muted">
                    Tools and technologies used in development
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                {CORE_TECHNOLOGIES.length} technologies
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {CORE_TECHNOLOGIES.map((technology, index) => {
                const Icon = technology.icon;

                return (
                  <motion.div
                    key={technology.name}
                    {...reveal(index * 0.015)}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-line bg-surface/70 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-surface sm:p-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-background text-muted transition-colors group-hover:border-emerald-500/20 group-hover:text-emerald-400">
                      <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-fg">
                        {technology.name}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-muted">
                        {technology.category}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Certifications */}

          <motion.section
            {...reveal(0.1)}
            aria-labelledby="certifications-heading"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-violet-400">
                  <Award size={19} aria-hidden="true" />
                </div>

                <div>
                  <h3
                    id="certifications-heading"
                    className="text-lg font-semibold tracking-tight text-fg"
                  >
                    Certifications
                  </h3>

                  <p className="mt-0.5 text-sm text-muted">
                    Professional learning and verified credentials
                  </p>
                </div>
              </div>

              <span className="w-fit rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                {filteredCertificates.length} shown
              </span>
            </div>

            {/* Search */}

            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search certificates or issuers..."
                  aria-label="Search certificates"
                  className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-10 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear certificate search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-muted transition-colors hover:text-fg"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Category filters */}

            <div
              className="mb-5 flex flex-wrap gap-2"
              aria-label="Filter certificates by category"
            >
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={isActive}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        : "border-line bg-surface text-muted hover:border-emerald-500/25 hover:text-fg"
                    }`}
                  >
                    {filter === "All" && <Filter size={12} aria-hidden="true" />}

                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Certificate cards */}

            {filteredCertificates.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCertificates.map((certificate, index) => {
                  const certificateImage = certificate.image;

                  return (
                    <motion.article
                      key={certificate.id}
                      {...reveal(index * 0.035)}
                      className="group min-w-0 overflow-hidden rounded-2xl border border-line bg-surface/70 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)]"
                    >
                      {/* Certificate image (click to open) */}

                      <button
                        type="button"
                        onClick={() => setSelected(certificate)}
                        aria-label={`Open ${certificate.title}`}
                        className="relative block w-full cursor-zoom-in overflow-hidden border-b border-line bg-background text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      >
                        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden sm:aspect-[5/4]">
                          {certificateImage ? (
                            <img
                              src={certificateImage}
                              alt={`${certificate.title} certificate`}
                              loading="lazy"
                              className="h-full w-full object-contain p-1 transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";

                                const fallback =
                                  event.currentTarget.parentElement?.querySelector(
                                    "[data-image-fallback]"
                                  );

                                if (fallback) {
                                  fallback.style.display = "flex";
                                }
                              }}
                            />
                          ) : null}

                          <div
                            data-image-fallback
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-sky-500/[0.07]"
                            style={{
                              display: certificateImage ? "none" : "flex",
                            }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface text-emerald-400">
                              <FileText size={23} aria-hidden="true" />
                            </div>

                            <span className="text-xs text-muted">
                              Certificate image unavailable
                            </span>
                          </div>

                          {/* Featured badge */}

                          {certificate.featured && (
                            <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-400/25 bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-amber-400 shadow-sm backdrop-blur">
                              <Star
                                size={11}
                                className="fill-amber-400"
                                aria-hidden="true"
                              />
                              Featured
                            </span>
                          )}

                          {/* Grade badge */}

                          {certificate.grade && (
                            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 shadow-sm backdrop-blur">
                              <Award size={11} aria-hidden="true" />
                              Grade {certificate.grade}
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Certificate details */}

                      <div className="p-4">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-2 py-1 text-[10px] font-semibold text-violet-400">
                            {certificate.category}
                          </span>
                        </div>

                        <h4 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-fg transition-colors group-hover:text-emerald-400">
                          {certificate.title}
                        </h4>

                        <p className="mt-1 truncate text-xs font-medium text-muted">
                          Issued by {certificate.issuer}
                        </p>

                        {certificate.description && (
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">
                            {certificate.description}
                          </p>
                        )}

                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                          <span className="inline-flex min-w-0 items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                            <CheckCircle2
                              size={13}
                              className="shrink-0"
                              aria-hidden="true"
                            />
                            <span className="truncate">
                              {certificate.status}
                            </span>
                          </span>

                          <button
                            type="button"
                            onClick={() => setSelected(certificate)}
                            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-medium text-fg transition-colors duration-200 hover:border-emerald-500/30 hover:text-emerald-400"
                          >
                            <Eye size={13} aria-hidden="true" />
                            View
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-surface/50 px-5 py-12 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-muted">
                  <Search size={19} aria-hidden="true" />
                </div>

                <h4 className="text-sm font-semibold text-fg">
                  No certificates found
                </h4>

                <p className="mt-1 text-sm text-muted">
                  Try a different search term or category.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-4 cursor-pointer rounded-lg border border-line px-3 py-2 text-xs font-medium text-fg transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
                >
                  Clear filters
                </button>
              </div>
            )}
          </motion.section>

          {/* Closing note */}

          <motion.div
            {...reveal(0.12)}
            className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-surface/50 p-4 sm:p-5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-background text-emerald-400">
              <Sparkles size={17} aria-hidden="true" />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-fg">
                Always learning. Always building.
              </h4>

              <p className="mt-1 text-sm leading-6 text-muted">
                Focused on building scalable, maintainable web applications and
                continuously improving my full-stack development skills.
              </p>
            </div>
          </motion.div>

          <div className="mt-12 border-t border-line" />
        </div>
      </section>

      {/* Certificate viewer modal */}

      <AnimatePresence>
        {selected && (
          <motion.div
            key="certificate-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setSelected(null);
              }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
          >
            <motion.div
              initial={
                reducedMotion ? false : { opacity: 0, scale: 0.97, y: 12 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{
                duration: reducedMotion ? 0 : 0.22,
                ease: EASE,
              }}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl"
            >
              {/* Modal header */}

              <div className="flex items-start justify-between gap-4 border-b border-line px-4 py-4 sm:px-5">
                <div className="min-w-0">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
                    {canNavigate
                      ? `Certificate ${selectedIndex + 1} of ${filteredCertificates.length}`
                      : "Certificate"}
                  </p>

                  <h3
                    id="certificate-modal-title"
                    className="text-sm font-semibold leading-5 text-fg sm:text-base"
                  >
                    {selected.title}
                  </h3>

                  <p className="mt-1 text-xs text-muted">
                    {selected.issuer}
                    {selected.grade ? ` · Grade ${selected.grade}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close certificate"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-line text-muted transition-colors hover:border-emerald-500/30 hover:text-fg"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Modal image with previous / next */}

              <div className="relative min-h-0 flex-1 overflow-auto bg-black/20 p-3 sm:p-5">
                {selected.image ? (
                  <motion.img
                    key={selected.id}
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                    src={selected.image}
                    alt={`${selected.title} full certificate`}
                    className="mx-auto h-auto max-h-[65vh] w-full object-contain"
                  />
                ) : (
                  <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
                    <FileText
                      size={36}
                      className="text-muted"
                      aria-hidden="true"
                    />

                    <p className="text-sm text-muted">
                      No certificate image is available.
                    </p>
                  </div>
                )}

                {canNavigate && (
                  <>
                    <button
                      type="button"
                      onClick={() => showAdjacent(-1)}
                      aria-label="Previous certificate"
                      className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-background/85 text-fg shadow-md backdrop-blur transition-colors hover:border-emerald-500/40 hover:text-emerald-400 sm:left-4"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      type="button"
                      onClick={() => showAdjacent(1)}
                      aria-label="Next certificate"
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-background/85 text-fg shadow-md backdrop-blur transition-colors hover:border-emerald-500/40 hover:text-emerald-400 sm:right-4"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Modal footer */}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  {selected.status || "Certificate"}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  {selected.image && (
                    <>
                      <a
                        href={selected.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-fg transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
                      >
                        <ExternalLink size={13} aria-hidden="true" />
                        Open Full Image
                      </a>

                      <a
                        href={selected.image}
                        download
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-fg transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
                      >
                        <Download size={13} aria-hidden="true" />
                        Download
                      </a>
                    </>
                  )}

                  {selected.url && (
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-emerald-400"
                    >
                      Verify Certificate
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}