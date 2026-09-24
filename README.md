# Smart Solar-Powered Agarbatti Dryer & Compact Packaging System

**Smart India Hackathon 2026 — Problem Statement SIH26022**
Domain: Electronics & Communication Engineering / Embedded Systems

A low-cost, enclosed solar drying chamber for freshly rolled agarbatti with an ESP32
control unit that monitors chamber temperature and relative humidity, switches a separate
mains-powered backup heater when sunlight is insufficient, and announces batch completion
by SMS (no Wi-Fi required), a green LED and a buzzer. Dried sticks move directly to a
manual heat-sealed packaging step.

> **Status:** student prototype. Estimated build cost **₹2,900 – ₹3,500** and a target
> capacity of about **3 kg per batch**. These are estimates and design targets, not quotes
> or measured results. Drying thresholds in the firmware are experimental calibration
> values. The GSM link, the relay-driven backup heater and the complete solar chamber are
> designed and coded but not yet tested end to end.

---

## What is actually new here

Solar drying of agarbatti is **not** a new invention. The contribution of this project is
the low-cost integration of:

- solar drying as the primary heat source
- an agarbatti-specific enclosed chamber (dust, insect and rain protection)
- chamber temperature and relative humidity monitoring
- automatic backup heating when solar heat is not enough
- GSM SMS notification that works without Wi-Fi or internet
- a drying-completion alert (green LED + buzzer)
- a compact manual heat-sealed packaging step

…in a single unit a small rural producer can afford, build and maintain.

## Hardware

| Block | Part |
| --- | --- |
| Controller | ESP32 development board |
| Sensing | DHT11 (chamber **air** temperature + RH) |
| Notification | GSM module + antenna + SIM (SMS) |
| Backup heat | Relay / SSR switching a **separate mains AC heater** |
| Local alert | Green LED + buzzer |
| Power (electronics) | Solar panel + charge controller + rechargeable battery |
| Drying | Enclosed solar drying chamber with trays |
| Packaging | Manual heat sealer |

## Repository layout

```
README.md
firmware/agarbatti_dryer.ino        ESP32 Arduino sketch
documentation/components.md         Component list and roles
documentation/working.md            Step-by-step working process
documentation/ece_architecture.md   Electronics block diagram
documentation/gsm_sms.md            GSM SMS design and AT command flow
documentation/testing.md            Test and calibration plan
documentation/safety.md             Electrical and thermal safety rules
circuit/pin_connections.md          ESP32 pin plan
flowchart/system_flow.md            Process and firmware flowcharts
bom/bill_of_materials.md            Estimated bill of materials
src/                                Project documentation website
```

## Website

A small documentation and monitoring website is included: dashboard, working process,
ECE architecture and full documentation. It presents the project layout and status; it is
not yet wired to live hardware, and readings shown there are sample values.

Run locally:

```bash
npm install
npm run dev
```

## Important honesty notes

- DHT11 measures **chamber air** temperature and relative humidity. It does **not**
  measure the internal moisture of the agarbatti sticks.
- Drying completion thresholds are **experimental / calibration values** and must be
  verified against a weight-loss test.
- No test results are reported in this repository.
- The AC backup heater is **never** powered from the battery; the relay output starts in
  the **OFF** state at every power-up.
- No real phone numbers, passwords, API keys or credentials are stored here. Fill in the
  operator number locally and do not commit it.

## License

Shared for academic and hackathon evaluation purposes.
