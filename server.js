'use strict';
const Omega2GPIO = require('omega2-gpio');
const mqtt = require('mqtt'); // Підключення бібліотеки mqtt сервера
const fs = require('fs');
const gpio = new Omega2GPIO();
const delay = require('delay');


let motor1 = gpio.pin(15);
let motor2 = gpio.pin(16);
let motor3 = gpio.pin(17);

motor1.set(1);
motor2.set(1);
motor3.set(1);

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
            motor1.set(0);
            delay(1000)
            .then(() => {
                motor1.set(1);
            });
            break;
        case 2:
            motor2.set(0);
            delay(1000)
            .then(() => {
                motor2.set(1);
            });
            break;
        case 3:
            motor3.set(0);
            delay(1000)
            .then(() => {
                motor3.set(1);
            });
            break;
    }
});
