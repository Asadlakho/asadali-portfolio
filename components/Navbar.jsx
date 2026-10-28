"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  FileDown,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home", id: "top" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/15P1ObHhQrX7Nc9NYf7Tp4k9QBZmRCzwu/view?usp=drive_link";

const HOME_ID = "top";
const LAST_ID = NAV_LINKS[NAV_LINKS.length - 1].id;
const SCROLL_OFFSET = 100;
const SCROLLED_AFTER = 12;

function getActiveSection() {
  const scrollPosition = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportBottom = window.innerHeight + scrollPosition;

  if (
    scrollPosition > 0 &&
    viewportBottom >= documentHeight - 8
  ) {
    return LAST_ID;
  }

  const marker = window.innerHeight * 0.35;
  let active = HOME_ID;
  let closest = -Infinity;

  for (const { id } of NAV_LINKS) {
    const section = document.getElementById(id);
    if (!section) continue;

    const top = section.getBoundingClientRect().top;

    if (top <= marker && top > closest) {
      closest = top;
      active = id;
    }
  }

  return active;
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if (!section) return;

  const top =
    section.getBoundingClientRect().top +
    window.scrollY -
    SCROLL_OFFSET;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

function DesktopLink({ id, label, activeId, onNavigate }) {
  const isActive = activeId === id;

  return (
    <a
      href={`#${id}`}
      aria-current={isActive ? "location" : undefined}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(id);
      }}
      className={[
        "group relative inline-flex min-h-10 items-center",
        "whitespace-nowrap rounded-xl px-3 py-2",
        "text-[13px] font-semibold tracking-[-0.01em]",
        "transition-colors duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-surface",
        isActive
          ? "text-fg"
          : "text-muted hover:bg-soft/70 hover:text-fg",
      ].join(" ")}
    >
      {label}

      <span
        aria-hidden="true"
        className={[
          "absolute inset-x-3 bottom-1 h-[2px] origin-center",
          "rounded-full bg-emerald-500 transition-transform duration-300",
          isActive
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-75",
        ].join(" ")}
      />

      {isActive && (
        <motion.span
          layoutId="navbar-active-indicator"
          aria-hidden="true"
          className="absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-emerald-500"
          transition={{ duration: 0.24, ease: "easeOut" }}
        />
      )}
    </a>
  );
}

function MobileLink({
  id,
  label,
  number,
  activeId,
  onNavigate,
}) {
  const isActive = activeId === id;

  return (
    <a
      href={`#${id}`}
      aria-current={isActive ? "location" : undefined}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(id);
      }}
      className={[
        "group flex min-h-12 w-full items-center gap-3",
        "rounded-xl px-3.5 py-3 text-sm font-semibold",
        "transition-colors duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-emerald-500",
        isActive
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "text-fg hover:bg-soft",
      ].join(" ")}
    >
      <span
        className={[
          "w-7 font-mono text-[11px] tracking-wider",
          isActive ? "text-emerald-500" : "text-muted",
        ].join(" ")}
      >
        {number}
      </span>

      <span>{label}</span>

      {isActive && (
        <span
          aria-hidden="true"
          className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500"
        />
      )}

      {!isActive && (
        <ArrowUpRight
          aria-hidden="true"
          size={15}
          className="ml-auto -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-60"
        />
      )}
    </a>
  );
}

export default function Navbar() {
  const [activeId, setActiveId] = useState(HOME_ID);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleNavigate = useCallback(
    (id) => {
      closeMenu();

      const url =
        id === HOME_ID
          ? `${window.location.pathname}${window.location.search}`
          : `#${id}`;

      window.history.replaceState(null, "", url);
      scrollToSection(id);
      setActiveId(id);
    },
    [closeMenu]
  );

  // Track the current section and navbar scroll state.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > SCROLLED_AFTER);
      setActiveId(getActiveSection());
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  // Close the mobile menu when clicking outside or pressing Escape.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { y: -1 },
        whileTap: { scale: 0.97 },
      };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main navigation"
        className={[
          "relative mx-auto flex w-full max-w-7xl",
          "items-center justify-between gap-2 sm:gap-4",
          "rounded-2xl border px-3 py-2 sm:px-4",
          "backdrop-blur-2xl",
          "transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled
            ? [
                "border-line bg-surface/95",
                "shadow-lg shadow-black/[0.07]",
                "dark:shadow-black/20",
              ].join(" ")
            : [
                "border-line/80 bg-surface/80",
                "shadow-md shadow-black/[0.025]",
              ].join(" "),
        ].join(" ")}
      >
        {/* Brand — existing logo and text preserved */}
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            handleNavigate(HOME_ID);
          }}
          aria-label="Asad Developer — Home"
          className={[
            "group flex shrink-0 items-center gap-2.5",
            "rounded-xl py-1",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-emerald-500",
          ].join(" ")}
        >
          <motion.span
            {...(reduceMotion
              ? {}
              : {
                  whileHover: { rotate: -4, scale: 1.04 },
                  whileTap: { scale: 0.96 },
                })}
            transition={{ duration: 0.2 }}
            className={[
              "relative grid h-10 w-10 shrink-0 place-items-center",
              "overflow-hidden rounded-xl border",
              "border-emerald-500/20 bg-emerald-500/10",
              "text-emerald-500 transition-all duration-300",
              "group-hover:border-emerald-500/40",
              "group-hover:bg-emerald-500/15",
            ].join(" ")}
          >
            <Code2 size={21} strokeWidth={2.2} />

            <span
              aria-hidden="true"
              className={[
                "absolute inset-x-2 bottom-0 h-px",
                "bg-gradient-to-r from-transparent",
                "via-emerald-400 to-transparent",
                "opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100",
              ].join(" ")}
            />
          </motion.span>

          <span className="hidden whitespace-nowrap text-[15px] font-extrabold tracking-tight text-fg sm:block">
            Asad<span className="text-emerald-500">.</span>
            <span className="ml-1.5 hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-muted xl:inline">
              Developer
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden min-w-0 items-center justify-center gap-0.5 lg:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <DesktopLink
                id={id}
                label={label}
                activeId={activeId}
                onNavigate={handleNavigate}
              />
            </li>
          ))}
        </ul>

        {/* Resume, theme and mobile menu */}
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <motion.a
            {...motionProps}
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume in a new tab"
            className={[
              "hidden min-h-10 items-center gap-2",
              "rounded-xl bg-emerald-600 px-3.5 py-2",
              "text-[13px] font-bold text-white sm:inline-flex",
              "shadow-md shadow-emerald-600/15",
              "transition-colors duration-200 hover:bg-emerald-500",
              "cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-surface",
            ].join(" ")}
          >
            <FileDown size={15} aria-hidden="true" />
            <span>Resume</span>
            <ArrowUpRight
              size={14}
              aria-hidden="true"
              className="opacity-75"
            />
          </motion.a>

          <div className="shrink-0">
            <ThemeToggle />
          </div>

          {/* Mobile menu */}
          <div className="relative lg:hidden" ref={menuRef}>
            <button
              ref={triggerRef}
              type="button"
              aria-label={
                isOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((open) => !open)}
              className={[
                "grid h-10 w-10 place-items-center rounded-xl",
                "border border-line bg-surface/80 text-fg",
                "transition-colors duration-200",
                "hover:border-emerald-500/40 hover:text-emerald-500",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-emerald-500 cursor-pointer",
              ].join(" ")}
            >
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={
                  reduceMotion
                    ? false
                    : { rotate: -25, opacity: 0 }
                }
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.16 }}
                className="grid place-items-center"
              >
                {isOpen ? <X size={19} /> : <Menu size={19} />}
              </motion.span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Mobile menu backdrop */}
                  <motion.button
                    type="button"
                    aria-label="Close navigation menu backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeMenu}
                    className="fixed inset-0 -z-10 cursor-pointer bg-black/20 backdrop-blur-[2px] lg:hidden"
                  />

                  <motion.div
                    id="mobile-navigation"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: -8, scale: 0.98 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8, scale: 0.98 }
                    }
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={[
                      "absolute right-0 top-[calc(100%+12px)]",
                      "w-[min(88vw,340px)] origin-top-right",
                      "rounded-2xl border border-line",
                      "bg-surface/95 p-3 shadow-2xl",
                      "shadow-black/10 backdrop-blur-2xl",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between px-3 pb-3 pt-1">
                      <div>
                        <p className="text-sm font-bold text-fg">
                          Navigation
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted">
                          Explore my portfolio
                        </p>
                      </div>

                      <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                        MENU
                      </span>
                    </div>

                    <div className="mb-2 h-px bg-line" />

                    <ul className="space-y-1">
                      {NAV_LINKS.map(({ id, label }, index) => (
                        <li key={id}>
                          <MobileLink
                            id={id}
                            label={label}
                            number={String(index + 1).padStart(2, "0")}
                            activeId={activeId}
                            onNavigate={handleNavigate}
                          />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 border-t border-line pt-3 sm:hidden">
                      <a
                        href={RESUME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[
                          "group flex min-h-11 items-center justify-center gap-2",
                          "rounded-xl bg-emerald-600 px-4 py-3",
                          "text-sm font-bold text-white",
                          "shadow-md shadow-emerald-600/15",
                          "transition-colors duration-200 hover:bg-emerald-500",
                          "focus-visible:outline-none focus-visible:ring-2",
                          "focus-visible:ring-emerald-500 cursor-pointer",
                        ].join(" ")}
                      >
                        <FileDown size={16} aria-hidden="true" />
                        View resume
                        <ArrowUpRight
                          size={16}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}
