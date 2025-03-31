const express = require("express")
const router = express.Router()
const mqtt = require('mqtt');
const { fileURLToPath } = require('url');
const path = require("path");


const client = mqtt.connect('mqtt://igbt.eesc.usp.br',
                            {
                                username: 'mqtt',
                                password: 'mqtt_123_abc'
                            });

const mqtt_topic = 'node';

client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message}`);
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    console.log('Subscribing to node topic');
    client.subscribe(mqtt_topic, (err) => {
        if (err) {
            console.error(`Error on subscribing to topic ${mqtt_topic}: ${err}`);
        }
        else {
            console.log(`Successfuly subscribed to topic: ${mqtt_topic}`);
        }
    });
});

const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.get("/", (req, res) => {
    res.render('send-files')
  });

router.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("Nenhum arquivo foi enviado");
  }
  
  let uploadedFile = req.files.file1; 
  let uploadPath = path.join("public/uploads", uploadedFile.name); 
  
  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.send(`Upload successful! <a href="/uploads/${uploadedFile.name}">View file</a>`);
    });
  });
  
module.exports = router;
