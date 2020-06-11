var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
var path = require('path');
var twilio = require('twilio');
var client = new twilio('ACaa5c478e311fa2c18244bc22b15bc100', '2be03ef4a5110e7125df42b684012e14');
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/app.html'));
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname + '/upload.html'));
});

app.post('/sendMessage', (req, res) => {
    var msg = req.body.msg;
    var receiver = req.body.receiver;
    client.messages.create({
        to: receiver,
        from: '+12028663350',
        body: msg
    });
    res.send("Success!");
});

app.listen(port, () => {
    console.log(`App hosted on ${port}`);
});