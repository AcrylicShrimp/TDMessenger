
'use strict';

const hashColor = require('./color-util');

function ChatServer(io) {
	this.io   = io;
	this.user = {};

	this.io.on('connection', (socket) => {
		console.log('new client[' + socket.id + '] connected');
		socket.username = null;

		socket.loginHandler = (data) => {
			if (this.handleLogin(socket, data)) {
				console.log('client[' + socket.id + '] logged in');
				socket.off('login', socket.loginHandler);
			}
		};
		
		socket.on('login', socket.loginHandler);
		
		socket.on('disconnect', () => {
			console.log('client[' + socket.id + '] disconnected');
			this.handleDisconnect(socket);
		});
	});
}

ChatServer.prototype.handleLogin = function(socket, data) {
	if (!data.username) {
		socket.emit('rejected', {
			reason: 'Invalid name.'
		});
		
		return false;
	}

	if (!this.addUser(data.username, socket)) {
		socket.emit('rejected', {
			reason: 'That name is invalid or already in used.'
		});

		return false;
	}

	let users = [];

	for (const username in this.user)
		if (this.user.hasOwnProperty(username) && username !== data.username) {
			const user = this.user[username];
			users.push({
				msg     : user.msg,
				color   : user.color,
				status  : user.status,
				position: user.position,
				username: username
			});
		}
	
	socket.broadcast.emit('enter', {
		msg     : socket.msg,
		color   : socket.color,
		status  : socket.status,
		position: socket.position,
		username: data.username
	});
	
	socket.emit('accepted', {
		users   : users,
		msg     : socket.msg,
		color   : socket.color,
		status  : socket.status,
		position: socket.position,
		username: data.username
	});

	return true;
}

ChatServer.prototype.handleDisconnect = function(socket) {
	if (!socket.username)
		return;

	this.removeUser(socket.username);
	
	this.io.emit('exit', {
		username: socket.username,
		reason  : 'Client disconnected.'
	});
}

ChatServer.prototype.haveUser = function(username) {
	return this.user.hasOwnProperty(username);
}

ChatServer.prototype.addUser = function(username, socket) {
	username = username.trim();

	if (!username.length)
		return false;

	if (this.haveUser(username))
		return false;
		
	this.user[socket.username = username] = socket;
	          socket.color                = hashColor(socket.username);
	          socket.status               = [false, false, false, false];
	          socket.position             = [0, 0];
	          socket.msg                  = '어서오세요! 채팅하려면 Enter를 눌러주세요.';
			  
	socket.on('rename', (data) => {
		this.renameUser(socket.username, data.username);
	});

	socket.on('chat', (data) => {
		socket.msg = data.msg;
		
		socket.broadcast.emit('chat', {
			msg     : data.msg,
			username: socket.username
		});
	});

	socket.on('state', (data) => {
		socket.status   = data.status;
		socket.position = data.position;

		socket.broadcast.emit('state', {
			status  : data.status,
			position: data.position,
			username: socket.username
		});
	});

	return true;
}

ChatServer.prototype.removeUser = function(username) {
	if (!this.haveUser(username))
		return;

	delete this.user[username];
}

ChatServer.prototype.renameUser = function(username, newname) {
	this.user[username].emit('renameRejected', {
		from  : username,
		to    : newname,
		reason: 'That name is already in used.'
	});

	const socket          = this.user[username];
	      socket.username = newname;
	
	this.user[newname] = socket;
	delete this.user[username];
	
	socket.emit('renameAccepted', {
		from: username,
		to  : newname
	});

	this.io.emit('rename', {
		from: username,
		to  : newname
	});
}

ChatServer.prototype.broadcastSystem = function(msg) {
	this.io.emit('system', {
		msg: msg
	});
}

module.exports = ChatServer;