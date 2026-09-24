# Bill of Materials

All prices are **estimates in Indian rupees** for planning a single student prototype. They
are not quotations and not guaranteed prices. Local market rates vary.

| # | Item | Qty | Est. cost (₹) |
| --- | --- | --- | --- |
| 1 | ESP32 development board | 1 | 700 – 900 |
| 2 | DHT11 temperature / RH sensor module | 1 | 80 – 150 |
| 3 | GSM module with antenna | 1 | 600 – 900 |
| 4 | Relay / SSR module | 1 | 120 – 250 |
| 5 | Solar panel (low wattage) | 1 | 500 – 700 |
| 6 | Rechargeable battery + charge controller | 1 set | 400 – 600 |
| 7 | Green LED, buzzer, resistors, jumper wires, terminal blocks | — | 100 – 200 |
| 8 | Chamber body, trays, glazing, vents, insulation | 1 set | 300 – 500 |
| 9 | Manual heat sealer (shared tool) | 1 | 400 – 700 |
| 10 | Enclosure, fuse / MCB, misc. hardware | — | 100 – 200 |

**Estimated prototype total: ₹2,900 – ₹3,500** (estimate only; overlapping ranges mean the
achievable total depends on sourcing and on reusing parts already available in the lab).

## Not included in the estimate

- AC backup heater element — price depends on the rating chosen; source locally and size it
  for the chamber volume.
- SIM card and SMS charges.
- Labour, fabrication charges and transport.

## Target performance (design figures, not measured)

| Parameter | Target |
| --- | --- |
| Batch capacity | ≈ 3 kg per batch |
| Primary heat source | Solar |
| Backup heat | Mains AC heater, relay switched |
| Notification | GSM SMS, no Wi-Fi |

These are design targets used for planning. Actual capacity, drying time and cost must be
established by the calibration runs described in `documentation/testing.md`. No test results
are claimed.
