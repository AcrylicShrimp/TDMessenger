
'use strict';

function SubShader(type) {
	this.subshader = null;
	this.type      = type;
}

SubShader.prototype.init = function(src) {
	this.subshader = gl.createShader(this.type);
	gl.shaderSource(this.subshader, src);
	gl.compileShader(this.subshader);
};

SubShader.prototype.fin = function() {
	gl.deleteShader(this.subshader);

	this.subshader = null;
};

function VertexSubShader() {
	SubShader.call(this, gl.VERTEX_SHADER);
}
VertexSubShader.prototype             = Object.create(SubShader.prototype);
VertexSubShader.prototype.constructor = VertexSubShader;

function FragmentSubShader() {
	SubShader.call(this, gl.FRAGMENT_SHADER);
}
FragmentSubShader.prototype             = Object.create(SubShader.prototype);
FragmentSubShader.prototype.constructor = FragmentSubShader;