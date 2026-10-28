"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Layers,
  Lock,
  Mail,
  MapPin,
  Send,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { site } from "../lib/data";

/* ------------------------------ Config ------------------------------ */

const PROFILE_IMAGE = "/developerasad.png"; // file must be in /public

// Google Drive CV (file must be shared as "Anyone with the link")
const RESUME_URL =
  "https://drive.google.com/file/d/15P1ObHhQrX7Nc9NYf7Tp4k9QBZmRCzwu/view?usp=drive_link";

const TECHNOLOGIES = [
  { name: "React.js", color: "#61DAFB" },
  { name: "Next.js", color: "#A1A1AA" },
  { name: "Node.js", color: "#68A063" },
  { name: "Express.js", color: "#C4B5FD" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Tailwind CSS", color: "#38BDF8" },
];

const HIGHLIGHTS = [
  { label: "Secure REST APIs", icon: Server },
  { label: "JWT Authentication", icon: Lock },
  { label: "Real-time apps", icon: Zap },
];

const EASE = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* --------------------------- Brand icons ---------------------------- */

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

/* --------------------------- Small parts ---------------------------- */

function AvailabilityBadge() {
  return (
    <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3.5 py-1.5 text-xs font-semibold text-fg sm:text-sm">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
        <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span>Open to full-time, remote &amp; freelance roles</span>
    </div>
  );
}

function TechChip({ name, color, index, reduceMotion }) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 + index * 0.05, duration: 0.4, ease: EASE }}
      className="flex items-center gap-2 rounded-lg border border-line bg-surface/90 px-3 py-1.5 backdrop-blur-xl"
    >
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className="whitespace-nowrap text-xs font-semibold text-fg">{name}</span>
    </motion.li>
  );
}

function FloatingCard({ icon: Icon, title, text, className, delay = 0, direction = 1, reduceMotion }) {
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -6 * direction, 0] }}
      transition={{ duration: 4.5 + delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-10 flex items-center gap-2.5 rounded-2xl border border-line bg-surface/95 p-2.5 shadow-xl shadow-black/[0.08] backdrop-blur-xl sm:p-3 ${className}`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-xs font-bold text-fg sm:text-sm">{title}</span>
        <span className="mt-0.5 block text-[10px] text-muted sm:text-xs">{text}</span>
      </span>
    </motion.div>
  );
}

function IconLink({ href, label, children }) {
  if (!href) return null;

  const isMail = href.startsWith("mailto:");

  return (
    <a
      href={href}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      aria-label={isMail ? label : `${label} (opens in a new tab)`}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/80 text-muted transition duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}

/* Contact button: send icon nudges every few seconds, flies on hover */
function ContactButton({ reduceMotion }) {
  return (
    <a
      href="#contact"
      className="group inline-flex h-10 items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.07] px-4 text-sm font-semibold text-emerald-700 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-500/60 hover:bg-emerald-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:text-emerald-400"
    >
      <motion.span
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: [0, 3, 0], y: [0, -3, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
        className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <Send size={16} />
      </motion.span>
      Contact me
    </a>
  );
}

/* --------------------------- Profile side --------------------------- */

function ProfileVisual({ reduceMotion }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[440px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.13] blur-[80px]"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto aspect-square w-full"
      >
        <div aria-hidden="true" className="absolute inset-[2%] rounded-full border border-emerald-500/20" />
        <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-dashed border-line/80" />

        <motion.div
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[2%] rounded-full"
        >
          <span className="absolute left-[16%] top-[15%] h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_#34d399]" />
          <span className="absolute bottom-[13%] right-[12%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_#6ee7b7]" />
        </motion.div>

        <div className="absolute inset-[13%] overflow-hidden rounded-full border border-emerald-500/25 bg-surface shadow-2xl shadow-emerald-500/10">
          <Image
            src={PROFILE_IMAGE}
            alt={`${site.name}, Full Stack Developer`}
            fill
            priority
            sizes="(max-width: 640px) 260px, 340px"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
        </div>

        {/* Cards sit on the outer ring so they never cover the face */}
        <FloatingCard
          icon={Layers}
          title="MERN Stack"
          text="Frontend + Backend"
          className="right-[-2%] top-[4%]"
          reduceMotion={reduceMotion}
        />
        <FloatingCard
          icon={ShieldCheck}
          title="Quality focused"
          text="Responsive & maintainable"
          className="bottom-[6%] left-[-2%]"
          delay={0.5}
          direction={-1}
          reduceMotion={reduceMotion}
        />
      </motion.div>

      <ul
        aria-label="Core technologies"
        className="relative z-10 mx-auto mt-4 flex max-w-[400px] flex-wrap justify-center gap-2"
      >
        {TECHNOLOGIES.map((tech, index) => (
          <TechChip key={tech.name} {...tech} index={index} reduceMotion={reduceMotion} />
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------- Hero ------------------------------- */

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate scroll-mt-24 overflow-hidden px-4 pb-12 pt-24 sm:px-7 sm:pb-14 lg:px-10 lg:pb-16 lg:pt-28 xl:px-12"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-12rem] top-16 h-80 w-80 rounded-full bg-emerald-500/[0.07] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 xl:gap-12">
        {/* Text first on every screen, so recruiters read it before anything else */}
        <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <motion.div {...reveal(0.05)} className="flex justify-center lg:justify-start">
            <AvailabilityBadge />
          </motion.div>

          <motion.p
            {...reveal(0.1)}
            className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted sm:text-xs"
          >
            Hello, I&apos;m {site.name}
          </motion.p>

          <motion.h1
            {...reveal(0.16)}
            id="hero-heading"
            className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-[-0.035em] text-fg sm:text-4xl md:text-5xl lg:text-[clamp(2.25rem,3.3vw,3.4rem)]"
          >
            Full Stack Developer who builds products that{" "}
            <span className="text-emerald-600 dark:text-emerald-400">move businesses forward.</span>
          </motion.h1>

          <motion.p
            {...reveal(0.22)}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold text-fg lg:justify-start"
          >
            <span>MERN Stack Developer</span>
            <span aria-hidden="true" className="text-muted">·</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-muted">
              <MapPin size={14} className="text-emerald-500" aria-hidden="true" />
              {site.location}
            </span>
          </motion.p>

          <motion.p
            {...reveal(0.28)}
            className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base lg:mx-0"
          >
            I build secure REST APIs, JWT authentication, real-time features and
            responsive interfaces with React, Next.js, Node.js, Express, and MongoDB.
          </motion.p>

          {/* Highlights */}
          <motion.ul
            {...reveal(0.31)}
            aria-label="Key strengths"
            className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start"
          >
            {HIGHLIGHTS.map(({ label, icon: Icon }) => (
              <li key={label} className="inline-flex items-center gap-2 text-sm font-medium text-fg">
                <Icon size={15} className="text-emerald-500" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>

          {/* Actions */}
          <motion.div
            {...reveal(0.36)}
            className="mt-6 flex flex-col justify-center gap-3 min-[420px]:flex-row lg:justify-start"
          >
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              View my projects
              <ArrowRight size={17} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-xl border border-line bg-surface/80 px-6 py-2.5 text-sm font-bold text-fg transition duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <Download
                size={17}
                aria-hidden="true"
                className="text-emerald-500 transition-transform duration-200 group-hover:translate-y-0.5"
              />
              Download resume
            </a>
          </motion.div>

          {/* Social + contact */}
          <motion.div
            {...reveal(0.42)}
            className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
          >
            <IconLink href={site.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </IconLink>
            <IconLink href={site.github} label="GitHub">
              <GitHubIcon />
            </IconLink>
            {site.email && (
              <IconLink href={`mailto:${site.email}`} label="Email">
                <Mail size={18} aria-hidden="true" />
              </IconLink>
            )}
            <ContactButton reduceMotion={reduceMotion} />
          </motion.div>
        </div>

        <div className="relative w-full">
          <ProfileVisual reduceMotion={reduceMotion} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mx-auto mt-10 h-px max-w-7xl bg-gradient-to-r from-transparent via-line to-transparent sm:mt-12 lg:mt-14"
      />
    </section>
  );
}