
'use strict';

function Renderer() {
	this.background      = new Background();
	this.character       = null;
	this.remoteCharacter = null;
	this.lastTime        = null;
}

Renderer.prototype.init = function() {
	this.background.init(null);
	this.remoteCharacter = {};
};

Renderer.prototype.fin = function() {
	window.clearInterval(this.interval);

	this.background.fin();
	
	for (const name in this.remoteCharacter)
		if (this.remoteCharacter.hasOwnProperty(name))
			this.remoteCharacter[name].fin();

	if (this.character)
		this.character.fin();
	
	this.character       = null;
	this.remoteCharacter = null;
	this.interval        = null;
	this.lastTime        = null;
};

Renderer.prototype.loop = function() {
	this.lastTime = performance.now();
	window.requestAnimationFrame(now => this.render(now));
};

Renderer.prototype.render = function(now) {
	if (!this.character) {
		gl.clear(gl.COLOR_BUFFER_BIT);

		this.lastTime = now;
		window.requestAnimationFrame(now => this.render(now));
		
		return;
	}

	const delta = (now - this.lastTime) * .001;
	
	let offset = [0, 0];
	
	if (input.pressed(37))
		offset[0] -= 1.;
	if (input.pressed(39))
		offset[0] += 1.;
	if (input.pressed(38))
		offset[1] += 1.;
	if (input.pressed(40))
		offset[1] -= 1.;
		
	const length = Math.sqrt(offset[0] * offset[0] + offset[1] * offset[1]);

	if (length >= .5) {
		this.character.position[0] += offset[0] / length * Character.prototype.speed * delta;
		this.character.position[1] += offset[1] / length * Character.prototype.speed * delta;
	}
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	this.background.render(delta);

	const image_size = [this.background.texture.width, this.background.texture.height];
	
	for (const name in this.remoteCharacter)
		if (this.remoteCharacter.hasOwnProperty(name))
			this.remoteCharacter[name].render(image_size, delta);
	
	this.character.render(image_size, delta);
	
	this.lastTime = now;
	window.requestAnimationFrame(now => this.render(now));
};

Renderer.prototype.initCharacter = function(data) {
	input.key = data.status;

	this.character = new Character();
	this.character.init(data.username, data.color, null);
	this.character.showChat(data.msg);
	this.character.position   = data.position;
	this.background.cameraPos = this.character.position;
	
	for (const name in data.users)
		if (data.users.hasOwnProperty(name)) {
			const user   = data.users[name];
			const remote = this.remoteCharacter[user.username] = new Character();
			
			remote.init(user.username, user.color, this.character.position);
			remote.showChat(user.msg);
			remote.status   = user.status;
			remote.position = user.position;
		}
};

Renderer.prototype.addRemote = function(data) {
	if (!this.remoteCharacter)
		return;

	const remote = this.remoteCharacter[data.username] = new Character();
	
	remote.init(data.username, data.color, this.character.position);
	remote.showChat(data.msg);
	remote.status   = data.status;
	remote.position = data.position;

	console.log(this.character.position);
};

Renderer.prototype.removeRemote = function(data) {
	if (!this.remoteCharacter)
		return;

	this.remoteCharacter[data.username].fin();
	delete this.remoteCharacter[data.username];
};

Renderer.prototype.updateRemote = function(data) {
	if (!this.remoteCharacter)
		return;

	const remote = this.remoteCharacter[data.username];

	remote.status   = data.status;
	remote.position = data.position;
};

Renderer.prototype.chatLocal = function(msg) {
	if (!this.character)
		return;

	this.character.showChat(msg);
}

Renderer.prototype.chatRemote = function(data) {
	if (!this.remoteCharacter)
		return;

	this.remoteCharacter[data.username].showChat(data.msg);
};