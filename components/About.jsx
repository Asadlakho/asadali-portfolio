"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  Gauge,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Workflow,
  GraduationCap,
  Terminal,
  GitBranch,
  Rocket,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";

const EASE = [0.22, 1, 0.36, 1];

const RESUME_URL =
  "https://drive.google.com/file/d/15P1ObHhQrX7Nc9NYf7Tp4k9QBZmRCzwu/view";

const STRENGTHS = [
  {
    icon: Blocks,
    color: "text-cyan-600 dark:text-cyan-400",
    surface: "bg-cyan-500/10",
    hover: "hover:border-cyan-500/30",
    title: "Full-stack development",
    description:
      "Connecting frontend interfaces with dependable backend services and APIs.",
  },
  {
    icon: Database,
    color: "text-violet-600 dark:text-violet-400",
    surface: "bg-violet-500/10",
    hover: "hover:border-violet-500/30",
    title: "Backend & data",
    description:
      "Building REST APIs, authentication flows, and data-driven applications.",
  },
  {
    icon: Gauge,
    color: "text-amber-600 dark:text-amber-400",
    surface: "bg-amber-500/10",
    hover: "hover:border-amber-500/30",
    title: "Quality & usability",
    description:
      "Prioritizing maintainable code, usability, and consistent experiences.",
  },
  {
    icon: Workflow,
    color: "text-rose-600 dark:text-rose-400",
    surface: "bg-rose-500/10",
    hover: "hover:border-rose-500/30",
    title: "Problem-solving",
    description:
      "Analyzing requirements, debugging issues, and improving solutions.",
  },
];

const PRINCIPLES = [
  {
    icon: Braces,
    color: "text-cyan-600 dark:text-cyan-400",
    surface: "bg-cyan-500/10",
    title: "Readable code",
    text: "Reusable components and a maintainable codebase.",
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    surface: "bg-emerald-500/10",
    title: "Reliable development",
    text: "Thoughtful validation, security, and error handling.",
  },
  {
    icon: MessageSquare,
    color: "text-violet-600 dark:text-violet-400",
    surface: "bg-violet-500/10",
    title: "Team collaboration",
    text: "Clear communication, useful feedback, and continuous learning.",
  },
];

const TECH_STACK = [
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "currentColor" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress, color: "currentColor" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 sm:text-sm">
      <Sparkles size={14} aria-hidden="true" />
      {children}
    </span>
  );
}

function StrengthCard({ item, index, reduceMotion }) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.45,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: EASE,
      }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className={[
        "group rounded-2xl border border-line bg-surface p-5",
        "transition-colors duration-300 sm:p-6",
        item.hover,
      ].join(" ")}
    >
      <span
        className={[
          "mb-5 grid h-11 w-11 place-items-center rounded-xl",
          item.surface,
          item.color,
        ].join(" ")}
      >
        <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
      </span>

      <h4 className="text-base font-bold tracking-tight text-fg">
        {item.title}
      </h4>

      <p className="mt-2 text-sm leading-7 text-muted">
        {item.description}
      </p>
    </motion.article>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-28 px-4 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Introduction */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <SectionLabel>About me</SectionLabel>

          <h2
            id="about-heading"
            className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-[-0.04em] text-fg sm:text-4xl md:text-5xl"
          >
            Engineering with purpose.
            <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Building for people.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
            I focus on thoughtful problem-solving, clean architecture, and
            building reliable software that delivers practical value.
          </p>

          {/* Education highlight */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-left">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <GraduationCap size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>

              <div>
                <p className="text-sm font-bold text-fg">
                  Computer Science Graduate
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  University of Sindh, Jamshoro
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Introduction and principles */}
        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:p-9"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Terminal size={21} aria-hidden="true" />
              </span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  My approach
                </p>
                <h3 className="mt-1 text-lg font-bold text-fg sm:text-xl">
                  Beyond writing code
                </h3>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Good development means more than making a page look right. It
              requires understanding the problem, choosing an appropriate
              solution, connecting systems effectively, and considering how
              the application will perform and evolve.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
              My focus is the MERN ecosystem and modern React-based
              development. I aim to create maintainable interfaces, build
              reliable application functionality, and approach debugging with
              patience and attention to detail.
            </p>

            <div className="mt-6 flex gap-3 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] p-4">
              <Lightbulb
                size={19}
                className="mt-0.5 shrink-0 text-amber-500"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-fg">
                <span className="font-semibold">My principle:</span>{" "}
                solve the actual problem without adding unnecessary complexity.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : 0.07,
              ease: EASE,
            }}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              How I work
            </p>

            <h3 className="mt-3 text-xl font-extrabold tracking-tight text-fg sm:text-2xl">
              Strong fundamentals. Thoughtful execution.
            </h3>

            <div className="mt-7 space-y-6">
              {PRINCIPLES.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span
                      className={[
                        "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                        item.surface,
                        item.color,
                      ].join(" ")}
                    >
                      <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-fg sm:text-base">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Strengths */}
        <div className="mt-16 sm:mt-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mb-7 sm:mb-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
              What I bring
            </p>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                Skills that support the product
              </h3>

              <p className="max-w-md text-sm leading-6 text-muted sm:text-right">
                Practical development focused on functionality, usability,
                maintainability, and solving real-world problems.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STRENGTHS.map((item, index) => (
              <StrengthCard
                key={item.title}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>

        {/* Core technologies */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:mt-12 sm:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <GitBranch size={20} aria-hidden="true" />
            </span>

            <div>
              <h3 className="font-bold text-fg">Core technologies</h3>
              <p className="mt-0.5 text-xs text-muted">
                My primary development toolkit
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {TECH_STACK.map((tech, index) => {
              const Icon = tech.icon;

              return (
                <motion.span
                  key={tech.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.25,
                    delay: reduceMotion ? 0 : index * 0.035,
                    ease: EASE,
                  }}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-emerald-500/30"
                >
                  <Icon
                    size={17}
                    aria-hidden="true"
                    style={{ color: tech.color }}
                  />
                  {tech.name}
                </motion.span>
              );
            })}

            <span className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-emerald-500/30">
              <Code2
                size={17}
                className="text-emerald-500"
                aria-hidden="true"
              />
              REST APIs
            </span>
          </div>
        </motion.div>

        {/* Hiring CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-8 flex flex-col gap-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.035] p-6 sm:mt-10 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <Rocket size={17} aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Open to opportunities
              </span>
            </div>

            <h3 className="mt-3 text-xl font-extrabold tracking-tight text-fg sm:text-2xl">
              Let&apos;s build something meaningful.
            </h3>

            <p className="mt-2 text-sm leading-7 text-muted">
              I&apos;m interested in full-stack, frontend, and backend
              opportunities where I can contribute to useful products,
              collaborate with a team, and continue growing as an engineer.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              Get in touch
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume on Google Drive (opens in a new tab)"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-emerald-500/40 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:hover:text-emerald-400"
            >
              View resume
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <div
          aria-hidden="true"
          className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent sm:mt-16"
        />
      </div>
    </section>
  );
}
