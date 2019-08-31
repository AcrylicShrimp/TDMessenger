
'use strict';

function Background() {
	this.texture      = new TextureRGBA();
	this.shader       = new Shader();
	this.vertexBuffer = new Float32Buffer();
	this.cameraPos    = null;
}

Background.prototype.init = function(cameraPos) {
	this.texture.init('/img/background.png');
	this.shader.init();
	this.vertexBuffer.init();
	
	this.shader.vertex([
		'precision mediump float;',

		'uniform vec2 offset;',
		'uniform vec2 image_size;',
		'uniform vec2 screen_size;',
		'uniform sampler2D background;',

		'attribute vec2 vert_position;',

		'varying vec2 frag_uv;',

		'void main() {',
		'	gl_Position = vec4(vert_position, .0, 1.);',
		'	frag_uv = ((vert_position + 1.) * .5 - .5) * screen_size / min(screen_size.x, screen_size.y);',

		'	if (image_size.x < image_size.y)',
		'		frag_uv.y *= image_size.y / image_size.x;',
		'	else',
		'		frag_uv.x *= image_size.x / image_size.y;',
		
		'	frag_uv += offset;',
		'}'
	].join('\n'));
	this.shader.fragment([
		'precision mediump float;',

		'uniform vec2 offset;',
		'uniform vec2 image_size;',
		'uniform vec2 screen_size;',
		'uniform sampler2D background;',

		'varying vec2 frag_uv;',

		'void main() {',
		'	gl_FragColor = vec4(texture2D(background, frag_uv).rgb, 1.);',
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

	this.shader.use();
	this.texture.use(0);

	this.cameraPos = cameraPos;
};

Background.prototype.fin = function() {
	this.texture.fin();
	this.shader.fin();
	this.vertexBuffer.fin();
	
	this.cameraPos = null;
};

Background.prototype.render = function(delta) {
	if (!this.texture.prepared)
		return;

	this.shader.use();
	this.texture.use(0);
	
	this.shader.attachUniformInt('background', [0]);
	this.shader.attachAttrFloat2('vert_position', this.vertexBuffer);
	this.shader.attachUniformFloat('offset', this.cameraPos ? this.cameraPos : [0, 0]);
	this.shader.attachUniformFloat('image_size', [this.texture.width, this.texture.height]);
	this.shader.attachUniformFloat('screen_size', [gl.canvas.width, gl.canvas.height]);
	
	gl.drawArrays(gl.TRIANGLES, 0, 6);
};