
'use strict';

function Texture(alignment, internalFormat, externalFormat) {
	this.image          = null;
	this.texture        = null;
	this.width          = 0;
	this.height         = 0;
	this.alignment      = alignment;
	this.internalFormat = internalFormat;
	this.externalFormat = externalFormat;
	this.prepared       = false;
}

Texture.prototype.init = function(src) {
	this.prepared = false;
	this.image    = new Image();

	this.image.onload = () => {	
		gl.bindTexture(gl.TEXTURE_2D, this.texture = gl.createTexture());

		gl.pixelStorei(gl.UNPACK_ALIGNMENT, this.alignment);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, this.externalFormat, gl.UNSIGNED_BYTE, this.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

		this.width    = this.image.width;
		this.height   = this.image.height;
		this.prepared = true;
	};
	
	this.image.src = src;
};

Texture.prototype.fin = function() {
	gl.deleteTexture(this.texture);

	this.image    = null;
	this.texture  = null;
	this.width    = 0;
	this.height   = 0;
	this.prepared = false;
};

Texture.prototype.use = function(slot) {
	gl.activeTexture(gl.TEXTURE0 + slot);
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
};

function TextureRGBA() {
	Texture.call(this, 4, gl.RGBA, gl.RGBA);
}
TextureRGBA.prototype             = Object.create(Texture.prototype);
TextureRGBA.prototype.constructor = TextureRGBA;

function TextureRGB() {
	Texture.call(this, 3, gl.RGB, gl.RGB);
}
TextureRGB.prototype             = Object.create(Texture.prototype);
TextureRGB.prototype.constructor = TextureRGB;

function TextureGrayscale() {
	Texture.call(this, 1, gl.LUMINANCE, gl.LUMINANCE);
}
TextureGrayscale.prototype             = Object.create(Texture.prototype);
TextureGrayscale.prototype.constructor = TextureGrayscale;