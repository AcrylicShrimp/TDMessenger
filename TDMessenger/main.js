
'use strict';

const http        = require('http');
const express     = require('express');
const socketio    = require('socket.io');
const compression = require('compression');
const chatserver  = require('./chatserver');

const port = process.env.PORT || 8080;

const instance = express();
const server   = http.createServer(instance);

instance.use(compression());
instance.use(express.static(__dirname + '/static'));
instance.use(require('./route'));
instance.use(function(req, res) {
    res.sendStatus(404);
});

const io         = socketio(server);
const chatServer = new chatserver(io);

server.listen(port);