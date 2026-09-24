import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter, PageHeader } from "@/components/SiteNav";
import { Note } from "@/components/Note";

export const Route = createFileRoute("/working")({
  head: () => ({
    meta: [
      { title: "Working Process | Solar Agarbatti Dryer (SIH26022)" },
      {
        name: "description",
        content:
          "Step-by-step working process of the solar agarbatti dryer: loading, solar drying, temperature and RH monitoring, backup heating, GSM SMS alert, packing and heat sealing.",
      },
      { property: "og:title", content: "Working Process | Solar Agarbatti Dryer" },
      {
        property: "og:description",
        content:
          "From fresh agarbatti to ready-to-sell packs: the ten-step drying and packaging flow of the SIH26022 prototype.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Working,
});

const steps = [
  {
    t: "Fresh agarbatti",
    d: "Freshly rolled sticks arrive with high surface moisture and cannot be packed yet.",
  },
  {
    t: "Loading",
    d: "Sticks are spread on trays inside the enclosed chamber so warm air can pass around them.",
  },
  {
    t: "Solar drying",
    d: "The solar thermal chamber warms the air. This is the primary heat source.",
  },
  {
    t: "Temperature / RH monitoring",
    d: "The ESP32 reads chamber air temperature and relative humidity from the DHT11 at regular intervals and prints them to the Serial Monitor.",
  },
  {
    t: "Backup heating if required",
    d: "If the chamber stays below the temperature threshold (cloudy weather, late evening), the ESP32 switches the relay on to run a separate mains-powered heater. It turns off again once the chamber recovers.",
  },
  {
    t: "GSM SMS",
    d: "When the drying condition is satisfied, the GSM module sends an SMS to the operator. No Wi-Fi or internet is needed.",
  },
  {
    t: "Drying complete",
    d: "The green LED turns on and the buzzer beeps so an operator standing nearby also gets the alert.",
  },
  { t: "Packing", d: "Dried sticks are counted and filled into pouches by hand." },
  { t: "Heat sealing", d: "A manual heat sealer closes each pouch." },
  { t: "Ready to sell", d: "Sealed, labelled packs leave the unit." },
];

function Working() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <PageHeader
        eyebrow="Process"
        title="Working Process"
        description="The full cycle from freshly rolled agarbatti to sealed, ready-to-sell packs."
      />
      <main className="mx-auto max-w-6xl px-5 pb-6">
        <div className="panel overflow-x-auto p-5">
          <p className="font-mono text-xs leading-relaxed whitespace-nowrap text-muted-foreground">
            Fresh Agarbatti → Loading → Solar Drying → Temperature/RH Monitoring → Backup
            Heating if Required → GSM SMS → Drying Complete → Packing → Heat Sealing →
            Ready-to-Sell
          </p>
        </div>

        <ol className="mt-8 space-y-3">
          {steps.map((s, i) => (
            <li key={s.t} className="panel flex gap-4 p-5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-solar font-display text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-base font-semibold">{s.t}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 space-y-4">
          <Note title="Thresholds are experimental">
            The temperature, humidity and hold-time values that decide "drying complete" are
            starting points for calibration. They must be verified batch by batch against a
            weight-loss check before being trusted. No test results are claimed here.
          </Note>
          <Note title="Electrical separation" tone="info">
            The AC backup heater runs from mains through a relay/SSR. It is never powered by
            the battery. The relay is initialised OFF at every power-up.
          </Note>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
