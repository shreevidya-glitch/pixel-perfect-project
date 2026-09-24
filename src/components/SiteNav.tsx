import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/working", label: "Working Process" },
  { to: "/architecture", label: "ECE Architecture" },
  { to: "/documentation", label: "Documentation" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-solar font-display text-sm font-bold text-primary-foreground">
            SD
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold">
              Solar Agarbatti Dryer
            </span>
            <span className="block text-xs text-muted-foreground">SIH26022 · SIH 2026</span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:font-medium data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-5 text-xs text-muted-foreground">
        <p>
          Student prototype documentation for Smart India Hackathon 2026 (Problem Statement
          SIH26022). Costs, batch capacity and drying thresholds shown on this site are
          estimates and calibration targets, not tested results.
        </p>
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 pb-6">
      <p className="font-mono text-xs tracking-widest text-primary uppercase">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}
