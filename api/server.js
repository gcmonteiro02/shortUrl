const express = require('express');
const http = require('http');

const app = require("./app/src/app")
const port = 3000;
app.set('port', port);


const server = http.createServer(app);
server.listen(port);