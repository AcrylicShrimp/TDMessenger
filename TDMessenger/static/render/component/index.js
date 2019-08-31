
'use strict';

function Index() {
	this.buffer = null;
}

Index.prototype.init = function() {
	this.buffer = gl.createBuffer();
};

Index.prototype.fin = function() {
	gl.deleteBuffer(this.buffer);

	this.buffer = null;
};

Index.prototype.fill = function(param) {
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, (typeof param === 'number') ? param : this.makeArray(param), gl.STATIC_DRAW);
};

Index.prototype.use = function() {
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
};

function Uint8Index() {
	Index.call(this);
}
Uint8Index.prototype             = Object.create(Index.prototype);
Uint8Index.prototype.constructor = Uint8Index;

Uint8Index.prototype.makeArray = function(arr) {
	return new Uint8Array(arr);
};

function Uint16Index() {
	Index.call(this);
}
Uint16Index.prototype             = Object.create(Index.prototype);
Uint16Index.prototype.constructor = Uint16Index;

Uint16Index.prototype.makeArray = function(arr) {
	return new Uint16Array(arr);
};