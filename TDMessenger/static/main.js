
'use strict';

let socket;
let canvas;
let canvasJquery;
let gl;
let input;
let renderer;
let chatting = false;

function onLoad() {
	socket = io();

	socket.on('rejected', onRejected);
	socket.on('accepted', onAccepted);
	socket.on('disconnect', onDisconnected);
	socket.on('chat', onChat);
	socket.on('rename', onRename);
	socket.on('renameRejected', onRenameRejected);
	socket.on('renameAccepted', onRenameAccepted);
	socket.on('state', onState);
	socket.on('enter', onEnter);
	socket.on('exit', onExit);

	canvas       = $('#canvas')[0];
	canvasJquery = $(canvas);

	if (!canvas)
		return;

	try {
		const attr = {
			alpha                       : true,
			antialias                   : true,
			depth                       : false,
			stencil                     : false,
			failIfMajorPerformanceCaveat: false,
			powerPreference             : 'high-performance'
		};

		gl = canvas.getContext('webgl', attr) || canvas.getContext('experimental-webgl', attr);
	}
	catch (e) {}

	if (!gl) {
		alert('Your browser doesn\'t support the WebGL!');
		return;
	}
	
	//function throwOnGLError(err, funcName, args) {
	//	throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
	//}
	//function logGLCall(functionName, args) {   
	//	console.log("gl." + functionName + "(" + 
	//		WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");   
	//}
	//function validateNoneOfTheArgsAreUndefined(functionName, args) {
	//	for (var ii = 0; ii < args.length; ++ii)
	//		if (args[ii] === undefined)
	//			console.error("undefined passed to gl." + functionName + "(" + WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
	//}
	//function logAndValidate(functionName, args) {
	//	logGLCall(functionName, args);
	//	validateNoneOfTheArgsAreUndefined (functionName, args);
	//}
	//gl = WebGLDebugUtils.makeDebugContext(gl, throwOnGLError, logAndValidate);
	
	gl.clearColor(.0, .0, .0, 1.);

	input    = new Input(window);
	renderer = new Renderer();

	onResize();
}

function onResize() {
	canvas.width  = canvasJquery.width();
	canvas.height = canvasJquery.height();
	gl.viewport(0, 0, canvas.width, canvas.height);
}

function onLogin() {
	$('#loginPanel')[0].style = 'display: none;';
	
	socket.emit('login', {
		username: $('#username')[0].value
	});
}

function onRejected(data) {
	alert('Cannot login!\n' + data.reason);
	$('#loginPanel')[0].style = '';
}

function onAccepted(data) {
	renderer.init();
	renderer.initCharacter(data);
	renderer.loop();
	
	input.registerHandler(keyCode => {
		if ((keyCode >= 37 && keyCode <= 40))
			socket.emit('state', {
				status: [
					input.key[37] ? true: false,
					input.key[38] ? true: false,
					input.key[39] ? true: false,
					input.key[40] ? true: false,
				],
				position: renderer.character.position
			});
		else if (keyCode == 13) {
			if (chatting) {
				chatting = false;
				
				const msg = $('#msg')[0].value.trim();
				
				if (msg.length) {
					renderer.chatLocal($('#msg')[0].value);
					socket.emit('chat', {
						msg: msg
					});
				}
				
				$('#chattingPanel')[0].style = 'display: none;';
				$('#msg')[0].value           = '';
			}
			else {
				chatting = true;
				
				$('#chattingPanel')[0].style = '';
				$('#msg')[0].focus();
			}
		}
	}, keyCode => {
		if ((keyCode >= 37 && keyCode <= 40))
			socket.emit('state', {
				status: [
					input.key[37] ? true: false,
					input.key[38] ? true: false,
					input.key[39] ? true: false,
					input.key[40] ? true: false,
				],
				position: renderer.character.position
			});
	}, () => {
		socket.emit('state', {
			status: [
				input.key[37] ? true: false,
				input.key[38] ? true: false,
				input.key[39] ? true: false,
				input.key[40] ? true: false,
			],
			position: renderer.character.position
		});
	});
}

function onDisconnected() {
	$('#loginPanel')[0].style = '';
	input.registerHandler(null, null, null);
	
	renderer.fin();
	alert('Disconnected.');
}

function onChat(data) {
	renderer.chatRemote(data);
}

function onRename(data) {
	
}

function onRenameRejected(data) {
	
}

function onRenameAccepted(data) {
	
}

function onState(data) {
	renderer.updateRemote(data);
}

function onEnter(data) {
	renderer.addRemote(data);
}

function onExit(data) {
	renderer.removeRemote(data);
}