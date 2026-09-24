import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter, PageHeader } from "@/components/SiteNav";
import { Note } from "@/components/Note";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "ECE Architecture | Solar Agarbatti Dryer (SIH26022)" },
      {
        name: "description",
        content:
          "Electronics architecture of the solar agarbatti dryer: solar panel to charge controller and battery, ESP32 controller, DHT11 sensor, GSM module, heater relay, LED and buzzer.",
      },
      { property: "og:title", content: "ECE Architecture | Solar Agarbatti Dryer" },
      {
        property: "og:description",
        content:
          "Block diagram and pin-level view of the ESP32 based control electronics for the SIH26022 prototype.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Architecture,
});

const diagram = `ELECTRICAL (low voltage)

  Solar Panel
       |
  Charge Controller ----> Rechargeable Battery
       |
     ESP32 (main controller)
       |-- DHT11        (chamber temperature + RH)
       |-- GSM Module   (SMS alerts, no Wi-Fi)
       |-- Relay / SSR  (switches separate AC heater)
       |-- Green LED    (drying complete)
       |-- Buzzer       (audible alert)

THERMAL (no electronics)

  Solar Thermal System ----> Drying Chamber ----> Agarbatti

MAINS (kept separate)

  AC Mains ----> Relay / SSR contacts ----> Backup Heater
                 (control side only from ESP32)`;

const blocks = [
  { t: "Solar panel", d: "Charges the battery through a charge controller. Low-voltage side only." },
  {
    t: "Battery + controller",
    d: "Keeps the ESP32, DHT11 and GSM module running when sunlight drops. Never feeds the heater.",
  },
  {
    t: "ESP32",
    d: "Reads the sensor, applies the drying logic, drives the relay, LED and buzzer, and talks to the GSM module over a serial port.",
  },
  {
    t: "DHT11",
    d: "Single-wire digital sensor for chamber air temperature and relative humidity.",
  },
  {
    t: "GSM module",
    d: "Sends the completion SMS over the cellular network. Needs a stable supply during transmit bursts.",
  },
  {
    t: "Relay / SSR",
    d: "Isolates the ESP32 from mains and switches the backup heater. Starts OFF.",
  },
  { t: "Green LED + buzzer", d: "Local indication that the batch is done." },
];

function Architecture() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <PageHeader
        eyebrow="Electronics"
        title="ECE Architecture"
        description="How power, sensing, control and alerting are arranged around the ESP32."
      />
      <main className="mx-auto max-w-6xl px-5 pb-6">
        <div className="panel overflow-x-auto p-5">
          <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
            {diagram}
          </pre>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.t} className="panel p-5">
              <h2 className="font-display text-base font-semibold">{b.t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 panel p-6">
          <h2 className="text-lg font-semibold">Example pin plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Starting point used by the firmware in this repository. Adjust to your own board
            layout.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase">
                  <th className="py-2 pr-4">Signal</th>
                  <th className="py-2 pr-4">ESP32 pin</th>
                  <th className="py-2">Note</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["DHT11 data", "GPIO 4", "10k pull-up to 3.3 V"],
                  ["Heater relay control", "GPIO 26", "Active level depends on relay module"],
                  ["Green LED", "GPIO 25", "Series resistor 220 Ω"],
                  ["Buzzer", "GPIO 27", "Use a driver transistor for a passive buzzer"],
                  ["GSM TX → ESP32 RX", "GPIO 16", "Serial2 RX"],
                  ["GSM RX ← ESP32 TX", "GPIO 17", "Serial2 TX, level-shift if needed"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-border/60">
                    <td className="py-2 pr-4 text-foreground">{r[0]}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{r[1]}</td>
                    <td className="py-2">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6">
          <Note title="Planned, not yet verified">
            The GSM link, the relay-driven backup heater and the complete solar thermal
            chamber are designed and coded but have not been physically tested end to end on
            the prototype.
          </Note>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
