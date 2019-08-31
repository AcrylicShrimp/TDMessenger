
'use strict';

function Shader() {
	this.program        = null;
	this.vertexshader   = null;
	this.fragmentshader = null;
}

Shader.prototype.init = function() {
	this.program = gl.createProgram();
};

Shader.prototype.fin = function() {
	if (this.vertexshader)
		this.vertexshader.fin();
	
	if (this.fragmentshader)
		this.fragmentshader.fin();
	
	gl.deleteProgram(this.program);
	
	this.program        = null;
	this.vertexshader   = null;
	this.fragmentshader = null;
};

Shader.prototype.vertex = function(src) {
	this.vertexshader = new VertexSubShader();
	this.vertexshader.init(src);

	gl.attachShader(this.program, this.vertexshader.subshader);
};

Shader.prototype.fragment = function(src) {
	this.fragmentshader = new FragmentSubShader();
	this.fragmentshader.init(src);

	gl.attachShader(this.program, this.fragmentshader.subshader);
};

Shader.prototype.link = function() {
	gl.linkProgram(this.program);
}

Shader.prototype.use = function() {
	gl.useProgram(this.program);
}

Shader.prototype.log = function() {
	return gl.getProgramInfoLog(this.program);
}

Shader.prototype.vertexLog = function() {
	return gl.getShaderInfoLog(this.vertexshader.subshader);
}

Shader.prototype.fragmentLog = function() {
	return gl.getShaderInfoLog(this.fragmentshader.subshader);
}

Shader.prototype.attribLocation = function(name) {
	return gl.getAttribLocation(this.program, name);
}

Shader.prototype.uniformLocation = function(name) {
	return gl.getUniformLocation(this.program, name);
}

Shader.prototype.attachAttrByte1 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 1, gl.BYTE, false, stride + Int8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrByte2 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 2, gl.BYTE, false, stride + 2 * Int8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrByte3 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 3, gl.BYTE, false, stride + 3 * Int8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrByte4 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 4, gl.BYTE, false, stride + 4 * Int8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrShort1 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 1, gl.SHORT, false, stride + Int16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrShort2 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 2, gl.SHORT, false, stride + 2 * Int16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrShort3 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 3, gl.SHORT, false, stride + 3 * Int16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrShort4 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 4, gl.SHORT, false, stride + 4 * Int16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUbyte1 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 1, gl.UNSIGNED_BYTE, false, stride + Uint8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUbyte2 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 2, gl.UNSIGNED_BYTE, false, stride + 2 * Uint8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUbyte3 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 3, gl.UNSIGNED_BYTE, false, stride + 3 * Uint8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUbyte4 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 4, gl.UNSIGNED_BYTE, false, stride + 4 * Uint8Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUshort1 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 1, gl.UNSIGNED_SHORT, false, stride + Uint16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUshort2 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 2, gl.UNSIGNED_SHORT, false, stride + 2 * Uint16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUshort3 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 3, gl.UNSIGNED_SHORT, false, stride + 3 * Uint16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrUshort4 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 4, gl.UNSIGNED_SHORT, false, stride + 4 * Uint16Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrFloat1 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 1, gl.FLOAT, false, stride + Float32Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrFloat2 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 2, gl.FLOAT, false, stride + 2 * Float32Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrFloat3 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);

	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 3, gl.FLOAT, false, stride + 3 * Float32Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachAttrFloat4 = function(name, buffer, stride = 0, offset = 0) {
	const location = this.attribLocation(name);
	
	buffer.use();
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, 4, gl.FLOAT, false, stride + 4 * Float32Array.BYTES_PER_ELEMENT, offset);
};

Shader.prototype.attachUniformInt = function(name, arr) {
	const location = this.uniformLocation(name);

	if (Array.isArray(arr)) {
		if (arr.length == 1)
			gl.uniform1i(location, arr[0]);
		else if(arr.length == 2)
			gl.uniform2i(location, arr[0], arr[1]);
		else if(arr.length == 3)
			gl.uniform3i(location, arr[0], arr[1], arr[2]);
		else
			gl.uniform4i(location, arr[0], arr[1], arr[2], arr[3]);
	} else {
		if (arr.length == 1)
			gl.uniform1iv(location, arr);
		else if(arr.length == 2)
			gl.uniform2iv(location, arr);
		else if(arr.length == 3)
			gl.uniform3iv(location, arr);
		else
			gl.uniform4iv(location, arr);
	}
};

Shader.prototype.attachUniformFloat = function(name, arr) {
	const location = this.uniformLocation(name);

	if (Array.isArray(arr)) {
		if (arr.length == 1)
			gl.uniform1f(location, arr[0]);
		else if(arr.length == 2)
			gl.uniform2f(location, arr[0], arr[1]);
		else if(arr.length == 3)
			gl.uniform3f(location, arr[0], arr[1], arr[2]);
		else
			gl.uniform4f(location, arr[0], arr[1], arr[2], arr[3]);
	} else {
		if (arr.length == 1)
			gl.uniform1fv(location, arr);
		else if(arr.length == 2)
			gl.uniform2fv(location, arr);
		else if(arr.length == 3)
			gl.uniform3fv(location, arr);
		else
			gl.uniform4fv(location, arr);
	}
};

Shader.prototype.attachUniformMatrix2 = function(name, mat) {
	gl.uniformMatrix2fv(this.uniformLocation(name), false, mat);
};

Shader.prototype.attachUniformMatrix3 = function(name, mat) {
	gl.uniformMatrix3fv(this.uniformLocation(name), false, mat);
};

Shader.prototype.attachUniformMatrix4 = function(name, mat) {
	gl.uniformMatrix4fv(this.uniformLocation(name), false, mat);
};