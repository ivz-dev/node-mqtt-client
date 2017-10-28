'use strict';
const Omega2GPIO = require('omega2-gpio');
const mqtt = require('mqtt'); // Підключення бібліотеки mqtt сервера
const fs = require('fs');
const gpio = new Omega2GPIO();

let motor1 = gpio.pin(15);
let motor2 = gpio.pin(16);
let motor3 = gpio.pin(17);

var content = fs.readFileSync('mqtt_credentials.json'); // Підключення масиву з правами доступу
var mqttCredentials = JSON.parse(content); // Перетворення JSON - об'єкту

var mqttOptions = {
    clientId: mqttCredentials.clientId,
    host: mqttCredentials.host,
    port: mqttCredentials.port,
    username: mqttCredentials.username,
    password: mqttCredentials.password
};

var client = mqtt.connect(mqttOptions); // Підключення до серверу

client.on('connect', function(){ // Функція викликається в разі успішного встановлення з'єднання
    console.log('API server start!');
    client.subscribe('wattering');
});


client.on('message', function (topic, message) {
    var message = message.toString();
    console.log(message);
    motor1.set(!motor1.get());
    motor2.set(!motor2.get());
    motor3.set(!motor3.get());
});
