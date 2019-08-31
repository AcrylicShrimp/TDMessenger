
'use strict';

function Input(target) {
	this.key         = {};
	this.downHandler = null;
	this.upHandler   = null;
	this.blurHandler = null;

	$(target).keydown((event) => {
		this.handleKeydown(event);
	});

	$(target).keyup((event) => {
		this.handleKeyup(event);
	});
	
	$(target).blur(() => {
		this.handleBlur();
	});
}

Input.prototype.registerHandler = function(down, up, blur) {
	this.downHandler = down;
	this.upHandler   = up;
	this.blurHandler = blur;
};

Input.prototype.handleKeydown = function(event) {
	this.key[event.keyCode] = true;

	if (this.downHandler)
		this.downHandler(event.keyCode);
};

Input.prototype.handleKeyup = function(event) {
	this.key[event.keyCode] = false;

	if (this.upHandler)
		this.upHandler(event.keyCode);
};

Input.prototype.handleBlur = function() {
	this.key = {};

	if (this.blurHandler)
		this.blurHandler();
};

Input.prototype.pressed = function(keycode) {
	return this.key[keycode];
};