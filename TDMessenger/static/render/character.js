
'use strict';

function Character() {
	this.shader       = Character.prototype.shared.shader;
	this.vertexBuffer = Character.prototype.shared.vertexBuffer;
	this.text         = new Text();
	this.chat         = new Text();
	this.color        = null;
	this.cameraPos    = null;
	this.position     = null;
	this.status       = null;
}

Character.prototype.shared = {
	ref         : 0,
	shader      : new Shader(),
	vertexBuffer: new Float32Buffer()
};
Character.prototype.speed = .5;
Character.prototype.size  = .05;

Character.prototype.init = function(name, color, cameraPos) {
	this.createShared();
	
	this.text.init();
	this.text.prepare('/font/NanumGothic-Regular.ttf', name);

	this.chat.init();
	this.chat.size  = .05;
	this.chat.color = [1, 1, 1, 1];
	
	this.text.size  = Character.prototype.size;
	this.text.color = [1, 1, 1, 1];
	this.color      = color;
	this.cameraPos  = cameraPos;
	this.position   = [0, 0];
	this.status     = [
		false,
		false,
		false,
		false
	];
};

Character.prototype.fin = function() {
	this.releaseShared();

	this.text.fin();

	this.color     = null;
	this.cameraPos = null;
	this.position  = null;
	this.status    = null;
};

Character.prototype.createShared = function() {
	if (!Character.prototype.shared.ref) {
		this.shader.init();
		this.vertexBuffer.init();
		
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

		this.vertexBuffer.fill([
			-1, 1,
			-1, -1,
			1, -1,

			-1, 1,
			1, -1,
			1, 1
		]);
	}

	++Character.prototype.shared.ref;
};

Character.prototype.releaseShared = function() {
	if (--Character.prototype.shared.ref)
		return;
		
	this.shader.fin();
	this.vertexBuffer.fin();
};

Character.prototype.showChat = function(text) {
	this.chat.prepare('/font/NanumGothic-Regular.ttf', text);
}

Character.prototype.render = function(image_size, delta) {
	let offset = [0, 0];
	
	if (this.status[0])
		offset[0] -= 1.;
	if (this.status[2])
		offset[0] += 1.;
	if (this.status[1])
		offset[1] += 1.;
	if (this.status[3])
		offset[1] -= 1.;
		
	const length = Math.sqrt(offset[0] * offset[0] + offset[1] * offset[1]);

	if (length >= .5) {
		this.position[0] += offset[0] / length * Character.prototype.speed * delta;
		this.position[1] += offset[1] / length * Character.prototype.speed * delta;
	}
	
	let relativePos;
	
	if (this.cameraPos)
		relativePos = [
			this.position[0] - this.cameraPos[0],
			this.position[1] - this.cameraPos[1]
		];
	else
		relativePos = [0, 0];
	
	this.shader.use();
	
	this.shader.attachUniformFloat('size', [Character.prototype.size]);
	this.shader.attachUniformFloat('position', relativePos);
	this.shader.attachUniformFloat('image_size', image_size);
	this.shader.attachUniformFloat('screen_size', [gl.canvas.width, gl.canvas.height]);
	this.shader.attachUniformFloat('color', this.color);
	
	this.shader.attachAttrFloat2('vert_position', this.vertexBuffer);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	this.text.position = relativePos;
	this.text.render();
	
	this.chat.position = [relativePos[0], relativePos[1] + Character.prototype.size * .5];
	this.chat.render();
};