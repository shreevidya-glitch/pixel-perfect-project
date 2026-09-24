import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter, PageHeader } from "@/components/SiteNav";
import { Note } from "@/components/Note";

export const Route = createFileRoute("/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation | Solar Agarbatti Dryer (SIH26022)" },
      {
        name: "description",
        content:
          "Problem statement, proposed solution, components, working principle, GSM SMS system, testing plan, safety rules, bill of materials, limitations and future scope for the SIH26022 solar agarbatti dryer.",
      },
      { property: "og:title", content: "Documentation | Solar Agarbatti Dryer" },
      {
        property: "og:description",
        content:
          "Complete engineering documentation for the ESP32-based solar agarbatti drying and packaging prototype.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Documentation,
});

const sections = [
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Proposed solution" },
  { id: "components", label: "Components" },
  { id: "principle", label: "Working principle" },
  { id: "gsm", label: "GSM SMS system" },
  { id: "testing", label: "Testing plan" },
  { id: "safety", label: "Safety" },
  { id: "bom", label: "Bill of materials" },
  { id: "limitations", label: "Limitations" },
  { id: "future", label: "Future improvements" },
];

const bom = [
  ["ESP32 development board", 1, "700 – 900"],
  ["DHT11 temperature / RH sensor", 1, "80 – 150"],
  ["GSM module with antenna", 1, "600 – 900"],
  ["Relay / SSR module", 1, "120 – 250"],
  ["Solar panel (low wattage)", 1, "500 – 700"],
  ["Rechargeable battery + charge controller", 1, "400 – 600"],
  ["Green LED, buzzer, resistors, wires", "—", "100 – 200"],
  ["Chamber body, trays, glazing, insulation", "—", "300 – 500"],
  ["Manual heat sealer (shared tool)", 1, "400 – 700"],
];

function Documentation() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <PageHeader
        eyebrow="Documentation"
        title="Project Documentation"
        description="Everything a reviewer or a teammate needs to understand, rebuild and test the prototype."
      />

      <main className="mx-auto max-w-6xl gap-10 px-5 pb-6 lg:grid lg:grid-cols-[210px_1fr]">
        <nav className="mb-8 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
          <p className="text-xs text-muted-foreground uppercase">On this page</p>
          <ul className="mt-2 space-y-1 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="prose-doc panel p-6 sm:p-8">
          <section id="problem">
            <h2>Problem</h2>
            <p>
              Small agarbatti units usually dry freshly rolled sticks in the open air or on
              rooftops. That exposes the batch to dust, insects and sudden rain, gives no
              control over drying conditions, and stretches over one to three days depending
              on the weather. Workers judge dryness by touch, so under-dried sticks reach
              packaging, where trapped moisture causes bending, fragrance loss, fungal
              spotting and rejected consignments. During monsoon and winter, production slows
              or stops.
            </p>
          </section>

          <section id="solution">
            <h2>Proposed solution</h2>
            <p>
              An enclosed solar drying chamber with a small electronic control unit. Solar heat
              is the primary drying energy. An ESP32 monitors chamber air temperature and
              relative humidity through a DHT11, switches a separate mains-powered backup
              heater through a relay when sunlight is insufficient, and announces batch
              completion with an SMS through a GSM module plus a green LED and buzzer. Dried
              sticks move straight to a manual heat-sealed packaging step.
            </p>
            <p>
              Solar drying of agarbatti is not a new invention. The contribution of this
              project is the low-cost integration of: solar drying, an agarbatti-specific
              enclosed chamber, temperature and RH monitoring, automatic backup heating,
              GSM SMS alerts that need no Wi-Fi, a completion alert, and compact packaging —
              in one unit that a small rural unit can afford and maintain.
            </p>
          </section>

          <section id="components">
            <h2>Components</h2>
            <ul>
              <li>ESP32 development board — main controller</li>
              <li>DHT11 — chamber air temperature and relative humidity</li>
              <li>GSM module with antenna and SIM — SMS alerts without internet</li>
              <li>Relay or solid-state relay — switches the AC backup heater</li>
              <li>AC backup heater element — mains powered, never battery powered</li>
              <li>Green LED and buzzer — drying completion indication</li>
              <li>Solar panel, charge controller and rechargeable battery — electronics supply</li>
              <li>Enclosed drying chamber with trays, glazing and vents</li>
              <li>Manual heat sealer — packaging</li>
            </ul>
          </section>

          <section id="principle">
            <h2>Working principle</h2>
            <p>
              Solar radiation heats the chamber air; warm air passing over the sticks carries
              moisture out through the vents. The ESP32 samples the DHT11 every few seconds.
              When chamber temperature falls below the configured minimum, the heater relay is
              switched on; when the chamber recovers past a small hysteresis margin, it is
              switched off again. A batch is treated as dry when temperature stays at or above
              the target and relative humidity stays at or below the target continuously for a
              configured hold time.
            </p>
            <p>
              The DHT11 measures chamber air only. It cannot read the internal moisture of the
              sticks, so every threshold below is a calibration target, to be checked against a
              weight-loss measurement.
            </p>
          </section>

          <section id="gsm">
            <h2>GSM SMS system</h2>
            <p>
              The GSM module connects to the ESP32 on a hardware serial port and is driven with
              plain AT commands. The firmware sends a text-mode SMS to an operator number that
              the user fills in locally — no phone number is stored in this repository. One
              message is sent per completed batch, and an optional message can be sent when the
              backup heater engages.
            </p>
            <p>
              Because SMS uses the cellular network, the unit needs no router, no Wi-Fi
              password and no internet plan. The module draws short high-current bursts while
              transmitting, so it needs its own well-decoupled supply rail.
            </p>
          </section>

          <section id="testing">
            <h2>Testing plan</h2>
            <ul>
              <li>Sensor check: compare DHT11 readings against a reference thermometer/hygrometer.</li>
              <li>Relay check: confirm the relay starts OFF at power-up and toggles at the threshold, first with a lamp instead of the heater.</li>
              <li>Alert check: verify LED, buzzer and SMS fire once per completion event.</li>
              <li>
                Calibration runs: weigh a sample tray before and after each run, record chamber
                temperature/RH over time, and adjust thresholds until the target weight loss
                matches the completion signal.
              </li>
              <li>Weather runs: repeat on a clear day, a cloudy day and after sunset to measure backup heater usage.</li>
              <li>Packaging check: confirm seal integrity and that packed sticks show no bending or spotting after storage.</li>
            </ul>
            <Note title="No results yet">
              This is a test plan, not a report. No measurement results are claimed anywhere in
              this project.
            </Note>
          </section>

          <section id="safety">
            <h2>Safety</h2>
            <ul>
              <li>The AC backup heater is powered only from mains, never from the battery or the ESP32 rail.</li>
              <li>The heater relay output is initialised OFF at every power-up and reset.</li>
              <li>Mains wiring stays physically separated from low-voltage wiring; use an enclosure, proper insulation and a fuse or MCB.</li>
              <li>Prefer an SSR or an opto-isolated relay module so the ESP32 is isolated from mains.</li>
              <li>Never leave the heater running unattended during early testing.</li>
              <li>Agarbatti material is combustible — keep chamber temperature moderate and vents clear.</li>
              <li>Mains work should be done with supervision from a qualified person.</li>
            </ul>
          </section>

          <section id="bom">
            <h2>Bill of materials</h2>
            <p>
              Indicative prices in Indian rupees. These are estimates for planning, not quotes.
              Estimated prototype total: ₹2,900 – ₹3,500.
            </p>
            <div className="overflow-x-auto not-prose">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase">
                    <th className="py-2 pr-4">Item</th>
                    <th className="py-2 pr-4">Qty</th>
                    <th className="py-2">Est. cost (₹)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {bom.map((r) => (
                    <tr key={String(r[0])} className="border-b border-border/60">
                      <td className="py-2 pr-4 text-foreground">{r[0]}</td>
                      <td className="py-2 pr-4">{r[1]}</td>
                      <td className="py-2">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="limitations">
            <h2>Limitations</h2>
            <ul>
              <li>DHT11 has coarse resolution and limited accuracy, and reads air only — not stick moisture.</li>
              <li>Completion thresholds are experimental and must be calibrated per recipe and season.</li>
              <li>Drying time depends on sunlight; heavy monsoon days will rely on the backup heater.</li>
              <li>Target capacity of about 3 kg per batch is a design figure, not a measured throughput.</li>
              <li>Packaging is manual, so output depends on operator speed.</li>
              <li>SMS delivery depends on network coverage and SIM balance.</li>
              <li>The GSM link, relay heater control and full chamber have not yet been tested end to end.</li>
            </ul>
          </section>

          <section id="future">
            <h2>Future improvements</h2>
            <ul>
              <li>Replace DHT11 with a higher-accuracy sensor such as SHT31 or AM2320.</li>
              <li>Add a load cell to infer dryness from actual weight loss.</li>
              <li>Log each batch to an SD card for repeatable calibration data.</li>
              <li>Add a small fan with airflow control for more even drying.</li>
              <li>Add a simple local display or keypad for threshold changes without a laptop.</li>
              <li>Semi-automatic pouch filling and sealing.</li>
              <li>Optional Wi-Fi dashboard where connectivity exists, keeping SMS as the fallback.</li>
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
