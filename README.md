# MQTT demo

This demo is built around the [Arduino Nano 33 IoT][33]

### Overview

**Input**: One Arduino runs the _iot_button_ sketch and has a push-button wired up.

**Output**: Another Arduino runs the _iot_vt_ sketch and has a vibrating motor wired up.

**Interaction**: When you push the button on the first Arduino, it will vibrate the motor on the second, even if you are in different countries!

**Debugging**: There is also a p5js-based interface that can be used to sanity check both the input and output. It connects to the same MQTT network and can trigger an input as well as visualize the output.

### Note

If everyone runs these samples at the same time, it will get chaotic since they all will be communicating on the same topics on the same broker. You can:

* Use a different broker, either [locally][broker], or a different [public one][public]
* Use a different topic, by changing the value of `mqttTopic` if each of the three samples

### Setup

In Arduino you will need the following libraries:
* **Bounce2** by Thomas O Fredericks, tested with v2.53.0
* **PubSubClient** by Nick O'Leary, tested with v2.8.0
* **WiFiNINA** by Arduino, tested with 1.7.1

You will need to update the **ssid** and **password** variables at the top of the Arduino files to match your WiFi network credentials.

#### iot_button

![connect the button between ground and digital pin 21][button]

#### iot_vt

![digital pin 2 controls an NPN transistor that powers a small vibrating motor][vt]


[33]: https://store.arduino.cc/usa/nano-33-iot
[public]: https://github.com/mqtt/mqtt.github.io/wiki/public_brokers
[broker]: https://mosquitto.org/download/
[button]: iot_button/iot_button.jpg
[vt]: iot_vt/iot_vt.jpg