let button;

let client = new Paho.Client("broker.hivemq.com", Number(8000), "ciid_2020_mqtt_p5_pubsub");
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
	message.destinationName = "ciid/iot/button";
	client.send(message);
}

function released() {
	var message = new Paho.Message("up");
	message.destinationName = "ciid/iot/button";
	client.send(message);
}

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("[onConnect]");
  client.subscribe("ciid/iot/button");
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