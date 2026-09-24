# Smart Solar-Powered Agarbatti Dryer & Compact Packaging System

**SIH Problem Statement ID:** SIH26022  
**Team Name:** INNO-FUSION

## 📌 Problem Statement

Traditional agarbatti drying is commonly dependent on weather conditions and open-air drying. Rain, humidity, dust and changing temperature can affect drying consistency, product quality and production time.

## 💡 Proposed Solution

We propose a compact, low-cost, enclosed solar-powered drying system designed for home-based agarbatti production.

The system uses solar thermal energy for drying and an ESP32-based monitoring system to measure chamber temperature and relative humidity. If solar heating is insufficient, a separate AC backup heater can be activated through a relay/SSR.

A GSM module provides SMS notifications without requiring Wi-Fi.

After drying, the agarbatti can be packed using moisture-resistant packaging and a manual heat sealer.

## ⚙️ How It Works

Fresh Agarbatti  
↓  
Loading into Drying Chamber  
↓  
Solar Drying  
↓  
Temperature & RH Monitoring  
↓  
Backup Heating if Required  
↓  
GSM Status / Completion SMS  
↓  
Drying Complete Alert  
↓  
Packing  
↓  
Heat Sealing  
↓  
Ready-to-Sell Product

## 🛠️ Key Features

- ☀️ Solar-powered drying chamber
- 🌡️ ESP32-based temperature and RH monitoring
- 💧 DHT11 sensor for chamber air temperature and RH
- 🔥 Separate AC backup heater for low-solar conditions
- 📱 GSM SMS notifications without Wi-Fi
- 🔔 LED and buzzer drying-completion alert
- 📦 Compact moisture-resistant packaging
- 🔧 Low-cost prototype design
- 🏠 Suitable for small-scale/home-based production

## 🔌 ECE Contribution

The ECE system consists of:

- ESP32 microcontroller
- DHT11 temperature/RH sensor
- GSM module
- Relay/SSR
- Green LED
- Buzzer
- Solar panel
- Rechargeable battery
- Supporting electronic components

The solar panel and battery supply the low-voltage electronics. The AC backup heater is powered separately and controlled through the relay/SSR.

## 📱 GSM Notification

The GSM module allows the system to send SMS notifications without Wi-Fi.

Example notifications:

- Drying started
- Temperature/RH status
- Backup heating activated
- Drying completed

No real phone numbers or credentials are stored in this repository.

## ⚠️ Drying Completion

The DHT11 measures the **air inside the drying chamber**, not the internal moisture content of the agarbatti.

Therefore, drying completion is treated as an estimated condition based on configurable temperature, RH and time parameters. These parameters must be calibrated using physical experiments before final deployment.

## 💰 Estimated Prototype Cost

Estimated prototype cost: **₹2,900–₹3,500**

Estimated prototype capacity: **approximately 3 kg per batch**

These values are prototype targets and may change depending on component prices, materials and final design.

## 📁 Repository Structure

```text
smart-solar-agarbatti-dryer/
│
├── README.md
│
├── firmware/
│   └── agarbatti_dryer.ino
│
├── documentation/
│   ├── components.md
│   ├── working.md
│   ├── ece_architecture.md
│   ├── gsm_sms.md
│   ├── testing.md
│   └── safety.md
│
├── circuit/
│   └── pin_connections.md
│
├── flowchart/
│   └── system_flow.md
│
└── bom/
    └── bill_of_materials.md
    '''
