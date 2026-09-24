import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Note } from "@/components/Note";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Solar-Powered Agarbatti Dryer & Packaging System | SIH26022" },
      {
        name: "description",
        content:
          "Student prototype dashboard for a solar agarbatti drying chamber with ESP32, DHT11 temperature/RH monitoring, backup heater control and GSM SMS alerts. SIH 2026, problem statement SIH26022.",
      },
      {
        property: "og:title",
        content: "Smart Solar-Powered Agarbatti Dryer & Packaging System",
      },
      {
        property: "og:description",
        content:
          "ESP32 + DHT11 + GSM based solar agarbatti drying prototype for Smart India Hackathon 2026 (SIH26022).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const demoReadings = {
  temperature: "48.6 °C",
  humidity: "31 %",
  updated: "sample value",
};

const statusItems = [
  {
    label: "System status",
    value: "Prototype — bench stage",
    hint: "Full hardware assembly not yet completed",
    tone: "warning" as const,
  },
  {
    label: "Heating source",
    value: "Solar thermal (primary)",
    hint: "AC backup heater switches in only below the temperature threshold",
    tone: "neutral" as const,
  },
  {
    label: "Drying status",
    value: "Awaiting calibration run",
    hint: "Completion rule depends on experimental thresholds",
    tone: "warning" as const,
  },
  {
    label: "GSM notification",
    value: "Code written, not field tested",
    hint: "SMS sent on drying completion, no Wi-Fi required",
    tone: "warning" as const,
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="border-b border-border bg-gradient-surface">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            Smart India Hackathon 2026 · Problem Statement SIH26022
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
            Smart Solar-Powered Agarbatti Dryer &amp; Compact Packaging System
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            An enclosed solar drying chamber for agarbatti with an ESP32 measuring chamber
            temperature and relative humidity, an automatic AC backup heater for cloudy
            weather, a GSM SMS alert that works without Wi-Fi, and a manual heat-sealed
            packaging step — assembled from low-cost, locally available parts.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/documentation"
              className="rounded-md bg-gradient-solar px-4 py-2 text-sm font-medium text-primary-foreground shadow-panel"
            >
              Read documentation
            </Link>
            <Link
              to="/working"
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              See working process
            </Link>
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Estimated prototype cost", v: "₹2,900 – ₹3,500", n: "estimate only" },
              { k: "Target batch capacity", v: "≈ 3 kg / batch", n: "design target" },
              { k: "Connectivity", v: "GSM SMS", n: "no Wi-Fi needed" },
            ].map((s) => (
              <div key={s.k} className="panel p-5">
                <dt className="text-xs text-muted-foreground uppercase">{s.k}</dt>
                <dd className="mt-1 font-display text-xl font-semibold">{s.v}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">{s.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="panel p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold">Chamber readings</h2>
              <span className="rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 text-xs font-medium">
                Sample display
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              These panels show the layout of the live monitoring screen. The values below are
              placeholders — the prototype is not yet connected to this page.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/50 p-5">
                <p className="text-xs text-muted-foreground uppercase">Chamber temperature</p>
                <p className="mt-1 font-display text-3xl font-semibold">
                  {demoReadings.temperature}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">DHT11 · {demoReadings.updated}</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/50 p-5">
                <p className="text-xs text-muted-foreground uppercase">
                  Chamber relative humidity
                </p>
                <p className="mt-1 font-display text-3xl font-semibold">
                  {demoReadings.humidity}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">DHT11 · {demoReadings.updated}</p>
              </div>
            </div>
            <div className="mt-4">
              <Note title="What the sensor actually measures">
                DHT11 reads the temperature and relative humidity of the air inside the
                chamber. It does <strong>not</strong> measure the internal moisture of the
                agarbatti sticks. Drying completion is inferred from chamber conditions held
                for a set time, using experimental threshold values that still need
                calibration.
              </Note>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="text-lg font-semibold">System status</h2>
            <ul className="mt-4 space-y-3">
              {statusItems.map((s) => (
                <li
                  key={s.label}
                  className="rounded-xl border border-border bg-secondary/40 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground uppercase">{s.label}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        s.tone === "warning"
                          ? "bg-warning/15 text-warning-foreground"
                          : "bg-success/15 text-foreground"
                      }`}
                    >
                      {s.value}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.hint}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 panel p-6">
          <h2 className="text-lg font-semibold">Hardware at a glance</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            {[
              "ESP32 main controller",
              "DHT11 temperature + RH sensor",
              "GSM module for SMS",
              "Relay / SSR for AC backup heater",
              "Green LED + buzzer completion alert",
              "Solar panel + rechargeable battery (electronics only)",
              "Enclosed solar drying chamber",
              "Manual heat sealer for packaging",
            ].map((h) => (
              <li key={h} className="rounded-lg border border-border bg-secondary/40 p-3">
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Safety rule built into the design: the AC backup heater is never powered from the
            battery. The battery and solar panel supply only the low-voltage electronics, and
            the heater relay starts in the OFF state.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
