/*
 * Smart Solar-Powered Agarbatti Dryer & Compact Packaging System
 * Smart India Hackathon 2026 - Problem Statement SIH26022
 *
 * Board   : ESP32 development board
 * Sensor  : DHT11 (chamber AIR temperature and relative humidity)
 * Outputs : Relay/SSR for a SEPARATE mains AC backup heater,
 *           green LED + buzzer for drying-complete alert
 * Comms   : GSM module on Serial2, plain AT commands (SMS, no Wi-Fi)
 *
 * ---------------------------------------------------------------------------
 * IMPORTANT NOTES - READ BEFORE USING
 * ---------------------------------------------------------------------------
 * 1. DHT11 measures the temperature and humidity of the CHAMBER AIR.
 *    It does NOT measure the internal moisture of the agarbatti sticks.
 * 2. All threshold values below are EXPERIMENTAL / CALIBRATION VALUES.
 *    They must be calibrated against a weight-loss test for your own chamber,
 *    recipe and season. They are not validated results.
 * 3. The AC backup heater must be powered from MAINS ONLY.
 *    It must NEVER be powered from the battery or the ESP32 supply.
 * 4. The heater relay is initialised to the OFF state at every power-up.
 * 5. No real phone number, password or API key is stored in this file.
 *    Fill in OPERATOR_NUMBER locally and do not commit it.
 * 6. The GSM SMS path and the relay-driven heater are written but NOT yet
 *    physically tested on the prototype.
 *
 * Library needed: "DHT sensor library" by Adafruit (+ Adafruit Unified Sensor)
 */

#include <DHT.h>

// ---------------------------------------------------------------------------
// Pin configuration (change to match your wiring)
// ---------------------------------------------------------------------------
#define DHT_PIN        4
#define DHT_TYPE       DHT11
#define RELAY_PIN      26   // backup heater control (mains side isolated)
#define GREEN_LED_PIN  25   // drying complete indicator
#define BUZZER_PIN     27   // drying complete alert
#define GSM_RX_PIN     16   // ESP32 receives  <- GSM TX
#define GSM_TX_PIN     17   // ESP32 transmits -> GSM RX

// Many relay boards are active-LOW. Set this to match your module.
#define RELAY_ACTIVE_HIGH  true

// ---------------------------------------------------------------------------
// Configurable thresholds - EXPERIMENTAL / CALIBRATION VALUES
// ---------------------------------------------------------------------------
const float TARGET_TEMP_C        = 45.0;  // chamber air temp considered good for drying
const float TARGET_RH_PERCENT    = 35.0;  // chamber air RH considered dry enough
const float HEATER_ON_TEMP_C     = 40.0;  // below this, switch backup heater ON
const float HEATER_HYSTERESIS_C  = 3.0;   // switch OFF at HEATER_ON_TEMP_C + this

const unsigned long HOLD_TIME_MS       = 30UL * 60UL * 1000UL; // 30 min hold
const unsigned long SENSOR_INTERVAL_MS = 2000UL;               // read every 2 s

// ---------------------------------------------------------------------------
// GSM settings - fill in locally, never commit a real number
// ---------------------------------------------------------------------------
const char* OPERATOR_NUMBER = "+9100000000";  // placeholder only
const bool  GSM_ENABLED     = true;           // set false to test without GSM

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
DHT dht(DHT_PIN, DHT_TYPE);

bool heaterOn        = false;
bool dryingComplete  = false;
bool holdActive      = false;
unsigned long holdStartMs   = 0;
unsigned long lastReadMs    = 0;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
void setHeater(bool on) {
  heaterOn = on;
  bool level = RELAY_ACTIVE_HIGH ? on : !on;
  digitalWrite(RELAY_PIN, level ? HIGH : LOW);
  Serial.print(F("[HEATER] backup heater "));
  Serial.println(on ? F("ON") : F("OFF"));
}

void gsmSend(const String& command, unsigned long waitMs) {
  Serial2.println(command);
  unsigned long start = millis();
  while (millis() - start < waitMs) {
    while (Serial2.available()) {
      Serial.write(Serial2.read());
    }
  }
  Serial.println();
}

void sendSms(const String& message) {
  if (!GSM_ENABLED) {
    Serial.print(F("[GSM] disabled, would send: "));
    Serial.println(message);
    return;
  }
  Serial.print(F("[GSM] sending SMS: "));
  Serial.println(message);

  gsmSend("AT", 500);                 // module awake?
  gsmSend("AT+CMGF=1", 500);          // text mode
  Serial2.print("AT+CMGS=\"");
  Serial2.print(OPERATOR_NUMBER);
  Serial2.println("\"");
  delay(500);
  Serial2.print(message);
  Serial2.write(26);                  // Ctrl+Z ends the message
  delay(5000);
  while (Serial2.available()) {
    Serial.write(Serial2.read());
  }
  Serial.println();
  Serial.println(F("[GSM] send attempt finished"));
}

void completionAlert() {
  digitalWrite(GREEN_LED_PIN, HIGH);
  for (int i = 0; i < 3; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(300);
    digitalWrite(BUZZER_PIN, LOW);
    delay(200);
  }
  Serial.println(F("[ALERT] green LED ON, buzzer beeped"));
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  delay(300);

  // Safety first: relay OFF before anything else.
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, RELAY_ACTIVE_HIGH ? LOW : HIGH);
  heaterOn = false;

  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(GREEN_LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  dht.begin();
  Serial2.begin(9600, SERIAL_8N1, GSM_RX_PIN, GSM_TX_PIN);

  Serial.println(F("========================================"));
  Serial.println(F(" Solar Agarbatti Dryer - SIH26022"));
  Serial.println(F(" Thresholds are EXPERIMENTAL values"));
  Serial.println(F(" Heater relay starts OFF"));
  Serial.println(F("========================================"));
}

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------
void loop() {
  if (millis() - lastReadMs < SENSOR_INTERVAL_MS) {
    return;
  }
  lastReadMs = millis();

  float tempC = dht.readTemperature();
  float rh    = dht.readHumidity();

  if (isnan(tempC) || isnan(rh)) {
    Serial.println(F("[SENSOR] DHT11 read failed, retrying"));
    return;
  }

  Serial.print(F("[SENSOR] chamber air temp: "));
  Serial.print(tempC, 1);
  Serial.print(F(" C | RH: "));
  Serial.print(rh, 1);
  Serial.println(F(" %"));

  // ---- Backup heater control (hysteresis so the relay does not chatter) ----
  if (!heaterOn && tempC < HEATER_ON_TEMP_C) {
    setHeater(true);
  } else if (heaterOn && tempC > HEATER_ON_TEMP_C + HEATER_HYSTERESIS_C) {
    setHeater(false);
  }

  if (dryingComplete) {
    return;  // batch finished; press reset or unload to start a new one
  }

  // ---- Drying completion logic (experimental) ----
  bool conditionMet = (tempC >= TARGET_TEMP_C) && (rh <= TARGET_RH_PERCENT);

  if (conditionMet) {
    if (!holdActive) {
      holdActive  = true;
      holdStartMs = millis();
      Serial.println(F("[DRYING] target condition reached, hold timer started"));
    } else {
      unsigned long held = millis() - holdStartMs;
      Serial.print(F("[DRYING] holding for "));
      Serial.print(held / 1000UL);
      Serial.print(F(" s of "));
      Serial.print(HOLD_TIME_MS / 1000UL);
      Serial.println(F(" s"));

      if (held >= HOLD_TIME_MS) {
        dryingComplete = true;
        setHeater(false);
        Serial.println(F("[DRYING] DRYING COMPLETE (per experimental thresholds)"));
        completionAlert();
        sendSms("Agarbatti batch drying complete. Chamber temp and RH held at target. "
                "Please unload and pack. (Thresholds are calibration values.)");
      }
    }
  } else if (holdActive) {
    holdActive = false;
    Serial.println(F("[DRYING] condition lost, hold timer reset"));
  }
}
