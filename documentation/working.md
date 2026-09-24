# Working Process

```
Fresh Agarbatti -> Loading -> Solar Drying -> Temperature/RH Monitoring
  -> Backup Heating if Required -> GSM SMS -> Drying Complete
  -> Packing -> Heat Sealing -> Ready-to-Sell
```

## 1. Fresh agarbatti
Freshly rolled sticks carry high surface moisture and cannot be packed. Packing them wet
causes bending, fragrance loss and fungal spotting.

## 2. Loading
Sticks are spread in a single layer on trays inside the enclosed chamber so warm air can
move around them. Trays are not overloaded — that is the most common cause of uneven
drying.

## 3. Solar drying
The chamber's glazed surface traps solar heat and warms the internal air. Warm air passing
over the sticks picks up moisture and leaves through the vents. Solar heat is the primary
energy source.

## 4. Temperature / RH monitoring
The ESP32 reads the DHT11 every 2 seconds and prints chamber air temperature and relative
humidity to the Serial Monitor. These readings drive both the heater decision and the
completion decision.

## 5. Backup heating if required
If chamber temperature falls below `HEATER_ON_TEMP_C`, the ESP32 energises the relay and the
separate mains heater runs. When the chamber rises past
`HEATER_ON_TEMP_C + HEATER_HYSTERESIS_C`, the relay is released. The hysteresis margin
prevents rapid on/off chattering.

## 6. GSM SMS
When the completion condition is satisfied, the GSM module sends an SMS to the operator's
number over the cellular network. No Wi-Fi, router or internet plan is involved.

## 7. Drying complete
The green LED latches on and the buzzer beeps three times, so an operator inside the shed
is alerted even without a phone in hand. Starting a new batch requires a reset / restart.

## 8. Packing
Dried sticks are counted or weighed and filled into pouches by hand.

## 9. Heat sealing
A manual heat sealer closes each pouch, keeping fragrance in and moisture out.

## 10. Ready to sell
Sealed and labelled packs leave the unit.

---

## Completion rule (experimental)

A batch is treated as dry when **both** conditions hold continuously for the configured
hold time:

- chamber air temperature ≥ `TARGET_TEMP_C`
- chamber relative humidity ≤ `TARGET_RH_PERCENT`

Defaults in the firmware: 45 °C, 35 % RH, 30 minutes hold.

These are **experimental calibration values**. DHT11 reads chamber air, not the moisture
inside the sticks, so the rule is an inference. It must be calibrated against a weight-loss
measurement for your chamber, recipe and season before being relied on. No test results are
claimed.
