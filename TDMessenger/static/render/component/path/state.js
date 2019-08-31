
'use strict';

function State(scale, quality) {
	this.x       = 0;
	this.y       = 0;
	this.scale   = scale;
	this.quality = quality ? quality < 1 ? 1 : quality : 1;
	this.vertex = [[]];
	this.at     = this.vertex[0];
}

State.prototype.absolute = function(x, y) {
	this.x = x;
	this.y = y;
};

State.prototype.absoluteX = function(x) {
	this.x = x;
};

State.prototype.absoluteY = function(y) {
	this.y = y;
};

State.prototype.relative = function(dx, dy) {
	this.x += dx;
	this.y += dy;
};

State.prototype.relativeX = function(dx) {
	this.x += dx;
};

State.prototype.relativeY = function(dy) {
	this.y += dy;
};

State.prototype.vertexAt = function() {
	this.at.push(this.x * this.scale);
	this.at.push(-this.y * this.scale);
};

State.prototype.cut = function() {
	this.at = this.vertex[this.vertex.push([]) - 1];
};