# System Flowcharts

## 1. Process flow (operator view)

```
        +---------------------+
        |   Fresh Agarbatti   |
        +----------+----------+
                   v
        +---------------------+
        | Loading onto trays  |
        +----------+----------+
                   v
        +---------------------+
        |    Solar Drying     |
        +----------+----------+
                   v
        +----------------------------+
        | Temperature / RH Monitoring|
        +------------+---------------+
                     v
             < temp below      >---- yes ---> +------------------+
             < threshold ?     |              | Backup Heating   |
             +-----------------+              | (mains heater)   |
                     | no                     +--------+---------+
                     v                                 |
             < dry condition   >---- no -------> back to monitoring
             < held long       |
             < enough ?        |
             +--------+--------+
                      | yes
                      v
        +---------------------------------+
        | GSM SMS to operator             |
        | Green LED ON + buzzer beeps      |
        +---------------+-----------------+
                        v
        +---------------------+
        |       Packing       |
        +----------+----------+
                   v
        +---------------------+
        |    Heat Sealing     |
        +----------+----------+
                   v
        +---------------------+
        |    Ready to Sell    |
        +---------------------+
```

## 2. Firmware flow (ESP32)

```
        Power on / reset
              |
              v
        Set relay output OFF   <-- safety first
              |
              v
        Init LED off, buzzer off
              |
              v
        Start DHT11, Serial, Serial2 (GSM)
              |
              v
   +----> Wait sensor interval (2 s)
   |          |
   |          v
   |    Read DHT11 temp + RH
   |          |
   |     read failed? -- yes --> print error ---+
   |          | no                              |
   |          v                                 |
   |    Print temp + RH to Serial Monitor       |
   |          |                                 |
   |          v                                 |
   |    Heater control with hysteresis:         |
   |      temp < HEATER_ON_TEMP  -> relay ON    |
   |      temp > ON + HYSTERESIS -> relay OFF   |
   |          |                                 |
   |          v                                 |
   |    drying already complete? -- yes --------+
   |          | no                              |
   |          v                                 |
   |    temp >= TARGET and RH <= TARGET ?       |
   |       no -> reset hold timer --------------+
   |       yes                                  |
   |          v                                 |
   |    hold timer running? no -> start it -----+
   |          | yes                             |
   |          v                                 |
   |    held >= HOLD_TIME ? no -----------------+
   |          | yes                             |
   |          v                                 |
   |    Relay OFF                               |
   |    Green LED ON + buzzer beeps             |
   |    Send GSM SMS                            |
   |    Mark drying complete                    |
   |          |                                 |
   +----------+---------------------------------+
```

## 3. Decision summary

| Decision | Input | Action |
| --- | --- | --- |
| Backup heat needed | chamber temp < `HEATER_ON_TEMP_C` | relay ON |
| Backup heat not needed | chamber temp > `HEATER_ON_TEMP_C + HEATER_HYSTERESIS_C` | relay OFF |
| Drying condition met | temp ≥ `TARGET_TEMP_C` **and** RH ≤ `TARGET_RH_PERCENT` | start / continue hold timer |
| Drying complete | condition held for `HOLD_TIME_MS` | relay OFF, LED ON, buzzer, SMS |

All thresholds are experimental calibration values. The DHT11 reads chamber air, not the
moisture inside the sticks.
