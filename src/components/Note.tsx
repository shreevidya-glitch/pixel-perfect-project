import type { ReactNode } from "react";

export function Note({
  tone = "warning",
  title,
  children,
}: {
  tone?: "warning" | "info";
  title: string;
  children: ReactNode;
}) {
  const toneClass =
    tone === "warning"
      ? "border-warning/40 bg-warning/10"
      : "border-border bg-secondary/60";
  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
