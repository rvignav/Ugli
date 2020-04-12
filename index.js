var express = require('express');
const app = express();
const port = process.env.PORT || 4000;
var twilio = require('twilio');
var client = new twilio('ACaa5c478e311fa2c18244bc22b15bc100', 'f672f731b6b97e880a652d1d6992c556');
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.get('/home', (req, res) => {
    res.send('home.html');
});
app.get('/upload', (req, res) => {
    res.send('upload.html');
});

app.get('/sendMessage', (req, res) => {
    client.messages.create({
        to: '+16692514036',
        from: '+12028663350',
        body: 'Hello from Twilio!'
    });
});

app.listen(port, () => {
    console.log(`App hosted on ${port}`);
});