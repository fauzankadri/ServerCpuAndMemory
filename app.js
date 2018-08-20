/*jshint esversion: 6 */
const express = require('express');
var bodyParser = require('body-parser');
var usageCpuMem = require('./usage-cpu-mem'); // the file to be implemented for this test

const app = express();

app.use(bodyParser.json());
app.use(express.static('static'));

app.use(function (req, res, next) {
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

app.post('/', function (req, res, next) {
    res.json(req.body);
});

// add any methods here.

app.get('/api/cpu/usage/', function (req, res, next) {
    res.json({ usage: usageCpuMem.getCpuUsage() }); // retrieved from the implemented file
});

app.get('/api/memory/usage/', function (req, res, next) {
    res.json({ usage: usageCpuMem.getMemoryUsage() }); // retrieved from the implemented file
});

app.get('/api/app/uptime/', function (req, res, next) {
    res.json({ uptime: usageCpuMem.getUptime() });
})

app.use(function (req, res, next) {
    console.log("HTTP Response", res.statusCode);
});

// create http server on port 3000

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});