var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Test update 6" }');
});

app.get('/will', function (req, res) {
    res.send('{ "response": "Hello World 123" }');
});
app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});
app.listen(process.env.PORT || 5000);
module.exports = app;
