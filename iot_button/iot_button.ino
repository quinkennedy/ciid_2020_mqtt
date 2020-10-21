#include <PubSubClient.h>
#include <WiFiNINA.h>
#include <Bounce2.h>

const char* ssid = "WiFi Name"; //Enter SSID
const char* password = "WiFi Password"; //Enter Password
const char* mqttServer = "broker.hivemq.com"; //Enter server adress
const uint16_t mqttPort = 1883; // Enter server port
const char* mqttTopic = "ciid/iot/button";
#define BUTTON_PIN 21

WiFiClient wifi;
PubSubClient client(wifi);
Bounce button = Bounce();

void setup() {
  //open the serial port for debugging
  Serial.begin(115200);

  //set up the button
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  button.attach(BUTTON_PIN);
  button.interval(5);

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

  //check the button state
  button.update();
  if (button.fell()){
    digitalWrite(LED_BUILTIN, HIGH);
    client.publish(mqttTopic, "down");
  } else if (button.rose()){
    digitalWrite(LED_BUILTIN, LOW);
    client.publish(mqttTopic, "up");
  }
}
