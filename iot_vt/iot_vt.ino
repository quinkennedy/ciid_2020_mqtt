#include <PubSubClient.h>
#include <WiFiNINA.h>

const char* ssid = "WiFi Name"; //Enter SSID
const char* password = "WiFi Password"; //Enter Password
const char* mqttServer = "broker.hivemq.com"; //Enter server adress
const uint16_t mqttPort = 1883; // Enter server port
#define VT_PIN 2

WiFiClient wifi;
PubSubClient client(wifi);

void setup() {
  //open the serial port for debugging
  Serial.begin(115200);

  //set up the button
  pinMode(VT_PIN, OUTPUT);
  digitalWrite(VT_PIN, LOW);

  //set up the LED for immediate feedback
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);

  //connect to wifi
  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
}

void loop() {
  //ensure MQTT is still connected
  if (!client.connected()) 
  {
    reconnect();
  }
  client.loop();
}
