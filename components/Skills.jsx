"use client";

import { memo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  Globe2,
  Layers3,
  Rocket,
  Server,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

import { skills } from "../lib/data";
import { wrap } from "./ui";

const EASE = [0.22, 1, 0.36, 1];

const CATEGORY_STYLES = [
  {
    icon: Code2,
    color: "text-emerald-500",
    surface: "bg-emerald-500/10",
    border: "hover:border-emerald-500/35",
    glow: "hover:shadow-emerald-500/[0.08]",
  },
  {
    icon: Server,
    color: "text-sky-500",
    surface: "bg-sky-500/10",
    border: "hover:border-sky-500/35",
    glow: "hover:shadow-sky-500/[0.08]",
  },
  {
    icon: Database,
    color: "text-violet-500",
    surface: "bg-violet-500/10",
    border: "hover:border-violet-500/35",
    glow: "hover:shadow-violet-500/[0.08]",
  },
  {
    icon: Workflow,
    color: "text-amber-500",
    surface: "bg-amber-500/10",
    border: "hover:border-amber-500/35",
    glow: "hover:shadow-amber-500/[0.08]",
  },
  {
    icon: Globe2,
    color: "text-cyan-500",
    surface: "bg-cyan-500/10",
    border: "hover:border-cyan-500/35",
    glow: "hover:shadow-cyan-500/[0.08]",
  },
  {
    icon: Wrench,
    color: "text-rose-500",
    surface: "bg-rose-500/10",
    border: "hover:border-rose-500/35",
    glow: "hover:shadow-rose-500/[0.08]",
  },
];

const FEATURED_STACK = [
  { name: "React.js", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
  { name: "Express.js", Icon: SiExpress, color: "currentColor" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
];

const AI_SKILLS = [
  "AI-assisted development",
  "LLM API integration",
  "Prompt design",
  "AI-powered web features",
];

function getCategoryDescription(title = "") {
  const value = title.toLowerCase();

  if (value.includes("front")) {
    return "Responsive, accessible interfaces built around usability, reusable components, and frontend performance.";
  }

  if (value.includes("back")) {
    return "Server-side logic, REST APIs, authentication, and reliable application workflows.";
  }

  if (value.includes("database") || value.includes("data")) {
    return "Structured data modeling, database operations, and maintainable data-driven applications.";
  }

  if (
    value.includes("tool") ||
    value.includes("devops") ||
    value.includes("deploy")
  ) {
    return "Practical development tools, version control, and streamlined delivery workflows.";
  }

  if (
    value.includes("design") ||
    value.includes("ui") ||
    value.includes("ux")
  ) {
    return "Consistent, user-focused experiences with responsive layouts and thoughtful interface details.";
  }

  if (
    value.includes("program") ||
    value.includes("language")
  ) {
    return "Programming fundamentals applied to practical problems and maintainable web features.";
  }

  return "Technologies and tools for building, integrating, and improving modern web applications.";
}

const Reveal = memo(function Reveal({
  children,
  reduceMotion,
  delay = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

const SkillChip = memo(function SkillChip({
  children,
  index = 0,
  reduceMotion,
}) {
  return (
    <motion.span
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.18),
        ease: EASE,
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-line/80 bg-soft/70 px-2.5 py-1.5 text-xs font-medium text-fg transition-colors duration-200 hover:border-emerald-500/35 hover:bg-emerald-500/[0.07] sm:text-[13px]"
    >
      {children}
    </motion.span>
  );
});

const SkillCard = memo(function SkillCard({
  skill,
  index,
  reduceMotion,
}) {
  const style = CATEGORY_STYLES[index % CATEGORY_STYLES.length];
  const Icon = style.icon;

  const handleMouseMove = useCallback((event) => {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - rect.top}px`
    );
  }, []);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : (index % 3) * 0.07,
        ease: EASE,
      }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      onMouseMove={handleMouseMove}
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-2xl",
        "border border-line bg-surface/90 p-5 shadow-sm sm:p-6",
        "transition-[border-color,box-shadow] duration-300",
        "hover:shadow-xl",
        style.border,
        style.glow,
      ].join(" ")}
    >
      {/* Cursor-follow spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(16,185,129,0.10), transparent 70%)",
        }}
      />

      {/* Animated top highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-3">
        <motion.div
          whileHover={reduceMotion ? undefined : { rotate: -5, scale: 1.06 }}
          transition={{ duration: 0.2, ease: EASE }}
          className={[
            "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
            style.surface,
            style.color,
          ].join(" ")}
        >
          <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
        </motion.div>

        <span className="rounded-full border border-line bg-surface/70 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative">
        <h3 className="mt-5 text-lg font-bold tracking-tight text-fg sm:text-xl">
          {skill.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted">
          {getCategoryDescription(skill.title)}
        </p>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {skill.items.map((item, itemIndex) => (
          <SkillChip
            key={item}
            index={itemIndex}
            reduceMotion={reduceMotion}
          >
            {item}
          </SkillChip>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between border-t border-line/80 pt-4">
        <span className="text-xs font-medium text-muted">
          Technical toolkit
        </span>

        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className={[
            "text-muted transition-all duration-300",
            "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            style.color,
          ].join(" ")}
        />
      </div>
    </motion.article>
  );
});

function AIShowcase({ reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: EASE,
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="group relative mt-5 overflow-hidden rounded-2xl border border-violet-500/20 bg-surface/90 p-5 shadow-sm transition-colors duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/[0.06] sm:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl transition-colors duration-300 group-hover:bg-violet-500/[0.14]"
      />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/10 text-violet-500 ring-1 ring-violet-500/15">
            <BrainCircuit size={24} strokeWidth={1.8} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold tracking-tight text-fg sm:text-xl">
                AI & Intelligent Web Development
              </h3>

              <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/[0.07] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-500">
                <Sparkles size={11} aria-hidden="true" />
                Emerging tech
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Exploring AI-assisted workflows and intelligent web features
              that can introduce useful automation and smarter experiences
              into full-stack applications.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-violet-500">
          <span className="h-2 w-2 rounded-full bg-violet-500" />
          AI + Full Stack
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {AI_SKILLS.map((item, index) => (
          <SkillChip
            key={item}
            index={index}
            reduceMotion={reduceMotion}
          >
            <Sparkles
              size={12}
              className="text-violet-500"
              aria-hidden="true"
            />
            {item}
          </SkillChip>
        ))}
      </div>

      
    </motion.article>
  );
}

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative isolate scroll-mt-24 overflow-hidden pt-20 sm:pt-24 lg:pt-28"
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-emerald-500/[0.055] blur-[100px]" />
        <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-violet-500/[0.05] blur-[110px]" />
      </div>

      <div className={wrap}>
        {/* Left-aligned section heading */}
        <Reveal reduceMotion={reduceMotion}>
          <div className="text-left">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-500">
              <Code2 size={14} aria-hidden="true" />
              Technical capabilities
            </p>

            <h2
              id="skills-heading"
              className="text-left text-3xl font-bold tracking-tight text-fg sm:text-4xl"
            >
              Technical Skills
            </h2>

            <p className="mt-3 max-w-2xl text-left text-sm leading-6 text-muted sm:text-base">
              The technologies, engineering practices, and tools I use to build
              responsive interfaces and full-stack web applications.
            </p>
          </div>
        </Reveal>

        {/* Featured MERN stack */}
        <Reveal
          reduceMotion={reduceMotion}
          delay={0.08}
          className="mt-7"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="mr-1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
              <Layers3
                size={15}
                className="text-emerald-500"
                aria-hidden="true"
              />
              Core stack
            </span>

            {FEATURED_STACK.map(({ name, Icon, color }) => (
              <motion.span
                key={name}
                whileHover={
                  reduceMotion ? undefined : { y: -3, scale: 1.025 }
                }
                transition={{ duration: 0.2, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-2 text-xs font-semibold text-fg shadow-sm transition-colors duration-200 hover:border-emerald-500/30 sm:text-sm"
              >
                <Icon
                  size={16}
                  aria-hidden="true"
                  style={{ color }}
                />
                {name}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* Skills categories */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              skill={skill}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        {/* AI skills showcase */}
        <AIShowcase reduceMotion={reduceMotion} />

        {/* Closing CTA */}
        <Reveal
          reduceMotion={reduceMotion}
          delay={0.05}
          className="mt-5"
        >
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.045] p-5 sm:flex sm:items-center sm:gap-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 via-emerald-500 to-cyan-500"
            />

            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Rocket size={22} aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold tracking-tight text-fg">
                  Beyond the tech stack
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted">
                  Focused on practical problem-solving, maintainable code,
                  responsive design, and translating requirements into
                  useful product features.
                </p>
              </div>
            </div>

            <a
              href="#projects"
              className="group mt-4 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-emerald-600 outline-none transition-colors hover:text-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-surface sm:ml-auto sm:mt-0 sm:shrink-0 dark:text-emerald-400"
            >
              Explore my projects
              <ArrowDownRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>

        {/* Section divider */}
        <div
          aria-hidden="true"
          className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent sm:mt-16"
        />
      </div>
    </section>
  );
}