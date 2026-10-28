
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      className={[
        "fixed bottom-6 right-6 z-40",
        "grid h-12 w-12 place-items-center rounded-full",
        "border border-white/15 bg-emerald-500 text-white",
        "shadow-lg shadow-emerald-950/20",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:bg-emerald-400",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-emerald-400 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--page-bg)]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <ArrowUp size={21} strokeWidth={2.2} aria-hidden="true" />
    </button>
  );
}
