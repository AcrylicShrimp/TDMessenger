
'use strict';

function Text() {
	this.shader       = Text.prototype.shared.shader,
	this.indexLength  = 0;
	this.indexBuffer  = new Uint16Index(),
	this.vertexBuffer = new Float32Buffer(),
	this.size         = null;
	this.position     = null;
	this.color        = null;
}

Text.prototype.shared = {
	ref   : 0,
	shader: new Shader()
};
Text.prototype.fontMap = {};

Text.prototype.init = function() {
	this.createShared();

	this.indexBuffer.init();
	this.vertexBuffer.init();

	this.size     = 1;
	this.position = [0, 0];
	this.color    = [0, 0, 0, 1];
};

Text.prototype.fin = function() {
	this.releaseShared();

	this.indexBuffer.fin();
	this.vertexBuffer.fin();
	
	this.indexLength = 0;
	this.size        = null;
	this.position    = null;
	this.color       = null;
};

Text.prototype.prepare = function(src, text) {
	this.obtainFont(src, font => {
		const data = path2Vertex((this.font = font).getPath(text, 0, 0, 1), 1, 3);
		
		this.indexLength = data.index.length;
		this.indexBuffer.fill(data.index);
		this.vertexBuffer.fill(data.vertex);
	});
};

Text.prototype.createShared = function() {
	if (!Text.prototype.shared.ref) {
		this.shader.init();

		this.shader.vertex([
			'precision mediump float;',

			'uniform float size;',
			'uniform vec2 position;',
			'uniform vec2 image_size;',
			'uniform vec2 screen_size;',
			'uniform vec4 color;',

			'attribute vec2 vert_position;',

			'void main() {',
			'	vec2 offset = position * min(screen_size.x, screen_size.y) / screen_size * 2.;',
			'	gl_Position = vec4(vert_position * min(screen_size.x, screen_size.y) / screen_size * size + offset, .0, 1.);',
			'}'
		].join('\n'));
		this.shader.fragment([
			'precision mediump float;',

			'uniform float size;',
			'uniform vec2 position;',
			'uniform vec2 image_size;',
			'uniform vec2 screen_size;',
			'uniform vec4 color;',

			'void main() {',
			'	gl_FragColor = color;',
			'}'
		].join('\n'));
		this.shader.link();
	}

	++Text.prototype.shared.ref;
};

Text.prototype.releaseShared = function() {
	if (--Text.prototype.shared.ref)
		return;

	this.shader.fin();
};

Text.prototype.obtainFont = function(src, callback) {
	let state = Text.prototype.fontMap[src];

	if (!state)
		state = Text.prototype.fontMap[src] = {
			font    : null,
			callback: []
		};

	if (state.font) {
		callback(state.font);
		return;
	}
	
	if (state.callback.length) {
		state.callback.push(callback);
		return;
	}
	
	state.callback.push(callback);

	opentype.load(src, (err, font) => {
		state.font = font;
		
		for (let index = 0; index < state.callback.length; ++index)
			state.callback[index](state.font);
	});
};

Text.prototype.render = function() {
	if (!this.indexLength)
		return;

	this.shader.use();
	
	this.shader.attachUniformFloat('size', [this.size]);
	this.shader.attachUniformFloat('position', this.position);
	this.shader.attachUniformFloat('image_size', [1, 1]);
	this.shader.attachUniformFloat('screen_size', [gl.canvas.width, gl.canvas.height]);
	this.shader.attachUniformFloat('color', this.color);
	
	this.shader.attachAttrFloat2('vert_position', this.vertexBuffer);
	
	this.indexBuffer.use();
	gl.drawElements(gl.TRIANGLES, this.indexLength, gl.UNSIGNED_SHORT, 0);
};