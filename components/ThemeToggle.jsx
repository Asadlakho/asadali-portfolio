"use client";
export default function ThemeToggle() {
  const toggle = () => {
    const r = document.documentElement;
    const next = r.getAttribute("data-theme") === "light" ? "dark" : "light";
    r.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  };
  return (
    <button onClick={toggle} aria-label="Switch light or dark theme"
      className="h-10 w-10 rounded-xl border border-line text-fg hover:border-accent cursor-pointer">◐</button>
  );
}
