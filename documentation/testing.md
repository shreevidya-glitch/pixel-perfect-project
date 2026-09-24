# Testing & Calibration Plan

This is a **plan**. No measurement results are reported anywhere in this repository.

## Stage 1 — Bench checks (no mains, no heater)

1. Flash the sketch with `GSM_ENABLED = false` and the heater relay disconnected from mains.
2. Confirm the Serial Monitor prints temperature and RH every 2 seconds.
3. Compare DHT11 readings against a reference thermometer and hygrometer at room conditions.
   Record the offset; do not "correct" the sensor silently.
4. Confirm the relay output reads OFF immediately after power-up and after a reset.

## Stage 2 — Output checks

1. Temporarily lower `TARGET_TEMP_C` and shorten `HOLD_TIME_MS` so the completion branch
   runs within a minute.
2. Confirm the green LED latches on and the buzzer beeps three times.
3. Confirm only one completion event occurs per run.
4. Restore the real threshold values afterwards.

## Stage 3 — Relay check with a safe load

1. Wire a table lamp in place of the heater.
2. Cool the sensor below `HEATER_ON_TEMP_C` and confirm the lamp switches on.
3. Warm the sensor past the hysteresis margin and confirm it switches off.
4. Verify there is no rapid chattering around the threshold.

## Stage 4 — GSM check

1. Insert a SIM with SMS enabled, set `GSM_ENABLED = true`, fill in the operator number
   locally.
2. Trigger the completion branch and confirm the SMS arrives.
3. Record how long delivery takes and whether the module resets during transmit (a sign of
   an inadequate supply).

## Stage 5 — Drying calibration runs

For each run, record: start time, ambient weather, tray load, and a log of chamber
temperature and RH.

1. Weigh a marked sample tray before loading.
2. Run a full drying cycle.
3. Weigh the same tray at completion and compute percentage weight loss.
4. Adjust `TARGET_TEMP_C`, `TARGET_RH_PERCENT` and `HOLD_TIME_MS` until the completion
   signal coincides with the weight loss the product actually needs.
5. Repeat for at least a few batches before treating the thresholds as settled.

## Stage 6 — Weather and duty-cycle runs

- Clear day: measure how much of the cycle needs no backup heat.
- Cloudy day: measure backup heater on-time.
- After sunset: confirm the controller behaves sensibly with no solar gain.

## Stage 7 — Packaging check

- Seal pouches and inspect seam integrity.
- Store sealed samples for one to two weeks and check for bending, spotting or fragrance
  loss.

## Recording template

| Run | Date | Weather | Load (kg) | Start weight | End weight | % loss | Heater on-time | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |
