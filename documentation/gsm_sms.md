# GSM SMS System

## Why SMS

Small agarbatti units often have no Wi-Fi router and no data plan, but cellular coverage is
usually available. SMS reaches a basic feature phone, needs no app, and works during a
power cut on the operator's side. The unit therefore needs no internet at all.

## Wiring

| GSM module | ESP32 |
| --- | --- |
| TX | GPIO 16 (`Serial2` RX) |
| RX | GPIO 17 (`Serial2` TX) — level-shift if the module is 5 V logic |
| GND | Common ground |
| VCC | Dedicated supply rail sized for transmit bursts (not the ESP32 3.3 V pin) |

The module is initialised at 9600 baud in the firmware.

## AT command flow used by the firmware

```
AT                        -> check the module responds
AT+CMGF=1                 -> switch to text mode
AT+CMGS="<number>"        -> start a message to the operator
<message text>
<Ctrl+Z, byte 0x1A>       -> send
```

Responses from the module are echoed to the Serial Monitor so a student can see exactly
what happened.

## When messages are sent

| Event | Message content |
| --- | --- |
| Drying complete | Batch finished; unload and pack. Includes a reminder that thresholds are calibration values |
| Backup heater engaged (optional) | Heater switched on because chamber temperature fell below the threshold |

One message per event, so a single batch produces one completion SMS.

## Credentials policy

No real phone number, SIM PIN, password or API key appears in this repository. The firmware
uses a placeholder:

```c
const char* OPERATOR_NUMBER = "+9100000000";  // placeholder only
```

Replace it locally before flashing and do not commit the change.

Setting `GSM_ENABLED = false` lets you test the full drying logic without a GSM module; the
message text is printed to the Serial Monitor instead of being sent.

## Practical points

- Keep the antenna away from the DHT11 wiring; transmit bursts can disturb sensitive lines.
- Use a SIM with SMS enabled and sufficient balance.
- Some networks reject messages without a correct country code, so keep the `+91` form.
- Delivery depends on network coverage; SMS is a notification, not a guaranteed real-time
  channel.

## Status

The GSM code path is written and reviewed but has **not yet been tested end to end** on the
assembled prototype.
