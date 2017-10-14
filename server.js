const mqtt = require('mqtt'); // Підключення бібліотеки mqtt сервера
const fs = require('fs');
const https = require('https');

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
    client.subscribe('temp');
    client.subscribe('weight');
});


client.on('message', function (topic, message) {
    console.log(message.toString());
    https.get('https://d3981e58.ngrok.io');
});
