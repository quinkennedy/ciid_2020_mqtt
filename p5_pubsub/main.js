const mqttBroker = "broker.hivemq.com";
const mqttTopic = "ciid/iot/button";

let button;

//https://gist.github.com/6174/6062387
var name = Math.random().toString(36).substring(2, 15);
name = "ciid_2020_mqtt_p5_pubsub_"+name;

let client = new Paho.Client(mqttBroker, Number(8000), name);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({onSuccess:onConnect});

function setup() {
  createCanvas(300, 300);
  background(0);
  button = createButton('click me');
  button.position(200, 200);
  button.mousePressed(pressed);
  button.mouseReleased(released);
}

function pressed() {
	var message = new Paho.Message("down");
	message.destinationName = mqttTopic;
	client.send(message);
}

function released() {
	var message = new Paho.Message("up");
	message.destinationName = mqttTopic;
	client.send(message);
}

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("[onConnect]");
  client.subscribe(mqttTopic);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("[onConnectionLost]:"+responseObject.errorMessage);
    background("red");
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("[onMessageArrived]:"+message.payloadString);
  if (message.payloadString == "down"){
  	background("yellow");
  } else {
  	background("black");
  }
}