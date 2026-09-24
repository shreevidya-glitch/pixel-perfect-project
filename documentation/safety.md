# Safety

Mains voltage is dangerous. Do the electrical work with supervision from a qualified
person, and treat every rule below as mandatory, not optional.

## Electrical

1. **The AC backup heater is powered from mains only.** It must never be powered from the
   battery, the solar panel or any ESP32 rail.
2. **The heater relay starts OFF.** The firmware sets the relay output to its inactive level
   before anything else in `setup()`, so a power-up or reset never energises the heater.
3. Use an **SSR or opto-isolated relay module** so the ESP32 control side is galvanically
   isolated from mains.
4. Keep mains wiring physically separated from low-voltage wiring — separate routing,
   separate terminal blocks, no shared bundle.
5. Fit a **fuse or MCB** on the heater circuit and earth the metal chassis.
6. Enclose all mains terminals; no exposed conductors anywhere the operator can touch.
7. Use cable of adequate rating for the heater current and tighten every terminal.
8. Protect the electronics enclosure from moisture and from direct chamber heat.

## Thermal and fire

1. Agarbatti material is combustible. Keep chamber temperature moderate and never let the
   heater run above its rated surface temperature.
2. Keep sticks away from direct contact with the heater element.
3. Keep vents clear so hot air cannot stagnate.
4. **Never leave the heater running unattended during early testing.** Add a hard thermal
   cut-out before any unattended operation.
5. Keep a dry-powder extinguisher or sand bucket near the unit.

## Battery

1. Use a charge controller matched to the battery chemistry; do not charge directly from the
   panel.
2. Do not enclose the battery without ventilation.
3. Fuse the battery output.

## Operating discipline

1. Disconnect mains before opening the enclosure.
2. Record any threshold change in the project log — a wrong threshold means longer heater
   runtime.
3. Treat the SMS alert as a convenience, not a substitute for supervision.

## Honest status

The relay-driven heater circuit and the GSM link are designed and coded but have not yet
been tested on the assembled prototype. All safety features described here must be verified
physically before any extended run.
