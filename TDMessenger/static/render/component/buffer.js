
'use strict';

function Buffer() {
	this.buffer = null;
}

Buffer.prototype.init = function() {
	this.buffer = gl.createBuffer();
};

Buffer.prototype.fin = function() {
	gl.deleteBuffer(this.buffer);
	
	this.buffer = null;
};

Buffer.prototype.fill = function(param) {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	gl.bufferData(gl.ARRAY_BUFFER, (typeof param === 'number') ? param : this.makeArray(param), gl.STATIC_DRAW);
};

Buffer.prototype.use = function() {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
};

function Int8Buffer() {
	Buffer.call(this);
}
Int8Buffer.prototype             = Object.create(Buffer.prototype);
Int8Buffer.prototype.constructor = Int8Buffer;

Int8Buffer.prototype.makeArray = function(arr) {
	return new Int8Array(arr);
};

function Int16Buffer() {
	Buffer.call(this);
}
Int16Buffer.prototype             = Object.create(Buffer.prototype);
Int16Buffer.prototype.constructor = Int16Buffer;

Int16Buffer.prototype.makeArray = function(arr) {
	return new Int16Array(arr);
};

function Int32Buffer() {
	Buffer.call(this);
}
Int32Buffer.prototype             = Object.create(Buffer.prototype);
Int32Buffer.prototype.constructor = Int32Buffer;

Int32Buffer.prototype.makeArray = function(arr) {
	return new Int32Array(arr);
};

function Uint8Buffer() {
	Buffer.call(this);
}
Uint8Buffer.prototype             = Object.create(Buffer.prototype);
Uint8Buffer.prototype.constructor = Uint8Buffer;

Uint8Buffer.prototype.makeArray = function(arr) {
	return new Uint8Array(arr);
};

function Uint8ClampedBuffer() {
	Buffer.call(this);
}
Uint8ClampedBuffer.prototype             = Object.create(Buffer.prototype);
Uint8ClampedBuffer.prototype.constructor = Uint8ClampedBuffer;

Uint8ClampedBuffer.prototype.makeArray = function(arr) {
	return new Uint8ClampedArray(arr);
};

function Uint16Buffer() {
	Buffer.call(this);
}
Uint16Buffer.prototype             = Object.create(Buffer.prototype);
Uint16Buffer.prototype.constructor = Uint16Buffer;

Uint16Buffer.prototype.makeArray = function(arr) {
	return new Uint16Array(arr);
};

function Uint32Buffer() {
	Buffer.call(this);
}
Uint32Buffer.prototype             = Object.create(Buffer.prototype);
Uint32Buffer.prototype.constructor = Uint32Buffer;

Uint32Buffer.prototype.makeArray = function(arr) {
	return new Uint32Array(arr);
};

function Float32Buffer() {
	Buffer.call(this);
}
Float32Buffer.prototype             = Object.create(Buffer.prototype);
Float32Buffer.prototype.constructor = Float32Buffer;

Float32Buffer.prototype.makeArray = function(arr) {
	return new Float32Array(arr);
};

function Float64Buffer() {
	Buffer.call(this);
}
Float64Buffer.prototype             = Object.create(Buffer.prototype);
Float64Buffer.prototype.constructor = Float64Buffer;

Float64Buffer.prototype.makeArray = function(arr) {
	return new Float64Array(arr);
};