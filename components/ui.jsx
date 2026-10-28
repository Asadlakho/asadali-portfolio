export const wrap = "mx-auto w-full max-w-5xl px-6";
export const btn = "inline-flex items-center justify-center rounded-xl px-6 py-3 text-[15px] font-semibold transition-colors";
export const solid = `${btn} bg-accent text-on hover:opacity-90`;
export const ghost = `${btn} border border-line text-fg hover:border-accent`;
export const card = "rounded-2xl border border-line bg-surface p-6";
export const Tag = ({ children }) => <span className="rounded-lg bg-soft px-3 py-1 text-sm font-medium">{children}</span>;
export const Head = ({ id, title, sub }) => (
  <div id={id} className="mb-10">
    <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
    {sub && <p className="mt-3 max-w-xl text-muted">{sub}</p>}
  </div>
);
