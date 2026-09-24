# ECE Architecture

## Block diagram

```
ELECTRICAL (low voltage, solar + battery)

   Solar Panel
        |
   Charge Controller ---------> Rechargeable Battery
        |
      ESP32 (main controller)
        |-- DHT11        : chamber air temperature + relative humidity
        |-- GSM Module   : SMS alerts over cellular, no Wi-Fi
        |-- Relay / SSR  : control signal only, switches the AC heater
        |-- Green LED    : drying complete
        |-- Buzzer       : audible alert

THERMAL (no electronics involved)

   Solar Thermal System ------> Drying Chamber ------> Agarbatti

MAINS (kept physically separate)

   AC Mains ---> Relay / SSR contacts ---> Backup Heater
                 (ESP32 touches the control side only)
```

## Signal flow

1. DHT11 sends temperature and RH to the ESP32 over a single data line (with a pull-up).
2. The ESP32 compares the readings against the configured thresholds.
3. Heater decision → digital output → relay/SSR control input → mains heater.
4. Completion decision → green LED output, buzzer output, and an AT-command SMS on
   `Serial2` to the GSM module.
5. Everything is echoed on the USB serial port for debugging.

## Power architecture

- Solar panel → charge controller → battery → 5 V / 3.3 V rails for the electronics.
- The GSM module is the heaviest momentary load (short transmit bursts) and needs its own
  well-decoupled rail with adequate bulk capacitance.
- The AC heater has a completely separate mains supply path. The only link between the two
  domains is the isolated relay/SSR.

## Interfaces used on the ESP32

| Interface | Used for |
| --- | --- |
| Single-wire digital (GPIO) | DHT11 |
| UART (`Serial2`) | GSM module AT commands, 9600 baud |
| UART (`Serial`, USB) | Serial Monitor debug output |
| Digital outputs | Relay control, green LED, buzzer |

## Planned / not yet verified

- End-to-end GSM SMS delivery on the assembled prototype.
- Relay-driven backup heater under real mains load.
- Complete solar thermal chamber performance.
