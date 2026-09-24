# Pin Connections

Example pin plan matching `firmware/agarbatti_dryer.ino`. Adjust the `#define` values in the
sketch if you wire differently.

## ESP32 pin map

| Signal | ESP32 pin | Direction | Notes |
| --- | --- | --- | --- |
| DHT11 DATA | GPIO 4 | input | 10 kΩ pull-up to 3.3 V |
| Heater relay control | GPIO 26 | output | Set `RELAY_ACTIVE_HIGH` to match the module |
| Green LED | GPIO 25 | output | 220 Ω series resistor to LED anode, cathode to GND |
| Buzzer | GPIO 27 | output | Active buzzer direct; passive buzzer needs a driver transistor |
| GSM TX → ESP32 RX | GPIO 16 | input | `Serial2` RX |
| GSM RX ← ESP32 TX | GPIO 17 | output | `Serial2` TX, level-shift if the module is 5 V logic |

## DHT11

| DHT11 | Connect to |
| --- | --- |
| VCC | 3.3 V |
| DATA | GPIO 4 (with 10 kΩ pull-up to 3.3 V) |
| GND | GND |

## GSM module

| GSM | Connect to |
| --- | --- |
| VCC | Dedicated supply rail (not the ESP32 3.3 V pin) sized for transmit bursts |
| GND | Common ground with the ESP32 |
| TX | GPIO 16 |
| RX | GPIO 17 (through a level shifter if 5 V logic) |

Add bulk capacitance close to the module's supply pins; brownouts during transmit are the
most common GSM failure on student builds.

## Relay / SSR and heater

```
   ESP32 GPIO 26 ------> IN   (relay module control input)
   3.3 V / 5 V     ----> VCC  (per module specification)
   GND             ----> GND

   AC Mains Live ------> COM
   Relay NO      ------> Heater Live
   AC Mains Neutral ---> Heater Neutral
   Earth ---------------> Heater body / chassis
```

Rules:

- Use the **NO (normally open)** contact so the heater is off when the relay is unpowered.
- The heater circuit is mains only; no battery connection anywhere on this side.
- Fuse or MCB on the mains live line, before COM.

## Power (low voltage)

```
   Solar Panel -> Charge Controller -> Battery -> 5 V regulator -> ESP32 / GSM / DHT11
```

Keep a single common ground for all low-voltage devices, and keep this ground completely
separate from the mains side.

## Safety reminders

- Relay output is initialised OFF in `setup()`.
- Mains and low-voltage wiring must be routed separately.
- Enclose all mains terminals.
