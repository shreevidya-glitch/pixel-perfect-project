# Components

All quantities are for one prototype unit.

| # | Component | Qty | Role in the system |
| --- | --- | --- | --- |
| 1 | ESP32 development board | 1 | Main controller: reads the sensor, runs the drying logic, drives relay/LED/buzzer, talks to the GSM module |
| 2 | DHT11 temperature + humidity sensor | 1 | Measures **chamber air** temperature and relative humidity |
| 3 | GSM module + antenna + SIM | 1 | Sends the completion SMS over the cellular network (no Wi-Fi needed) |
| 4 | Relay or solid-state relay module | 1 | Switches the separate mains AC backup heater; provides isolation from the ESP32 |
| 5 | AC backup heater element | 1 | Adds heat on cloudy days / after sunset. **Mains powered only** |
| 6 | Green LED + 220 Ω resistor | 1 | Visual "drying complete" indicator |
| 7 | Buzzer | 1 | Audible "drying complete" alert |
| 8 | Solar panel (low wattage) | 1 | Charges the battery for the electronics |
| 9 | Charge controller | 1 | Protects the battery while charging |
| 10 | Rechargeable battery | 1 | Keeps ESP32 / DHT11 / GSM running when sunlight drops |
| 11 | Drying chamber body, trays, glazing, vents, insulation | 1 set | Enclosed solar drying space, protects the batch from dust, insects and rain |
| 12 | Manual heat sealer | 1 | Seals the packed pouches |
| 13 | Jumper wires, terminal blocks, enclosure, fuse/MCB | — | Wiring and protection |

## Notes on selection

- **DHT11** was chosen for cost and simplicity. Its resolution is coarse (about 1 °C / 1 %
  RH) and it reads air, not the stick interior. A higher-accuracy sensor (SHT31, AM2320) is
  a planned upgrade.
- **GSM over Wi-Fi**: small units often have no router or data plan, but almost always have
  cellular coverage. SMS also reaches a basic feature phone.
- **SSR preferred** over a mechanical relay for a resistive heater load: no contact wear,
  silent switching, and built-in opto-isolation.
- **Battery sizing** must cover the GSM module's short high-current transmit bursts, which
  is the largest momentary load on the low-voltage side.

## What the battery does and does not power

Powered by solar + battery: ESP32, DHT11, GSM module, LED, buzzer, relay coil / SSR control
input.

**Not** powered by solar + battery: the AC backup heater. It runs from mains through the
relay contacts only.
