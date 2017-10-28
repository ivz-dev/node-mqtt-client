const mqtt = require('mqtt'); // Підключення бібліотеки mqtt сервера
const fs = require('fs');

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
    if(parseInt(message) > 0 && parseInt(message) < 13){
         this.digitalWrite(13, this.HIGH);
    } else {
        this.digitalWrite(13, this.LOW);
    }
});
