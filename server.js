'use strict';
const Omega2GPIO = require('omega2-gpio');
const mqtt = require('mqtt'); // Підключення бібліотеки mqtt сервера
const fs = require('fs');
const gpio = new Omega2GPIO();
const delay = require('delay');


let motor1 = gpio.pin(15);
let motor2 = gpio.pin(16);
let motor3 = gpio.pin(17);

motor1.set(true);
motor2.set(true);
motor3.set(true);

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
    var message = parseInt(message.toString());
    console.log(message);

    switch(message){
        case 1:
            motor1.set(false);
            delay(1000)
            .then(() => {
                motor1.set(true);
            });
            break;
        case 2:
            motor2.set(true);
            delay(1000)
            .then(() => {
                motor2.set(false);
            });
            break;
        case 3:
            motor3.set(true);
            delay(1000)
            .then(() => {
                motor3.set(false);
            });
            break;
    }
});
