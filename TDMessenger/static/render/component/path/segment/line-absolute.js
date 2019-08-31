
'use strict';

function LineAbsolute(state, cmd) {
	state.absolute(cmd.x, cmd.y);
	state.vertexAt();
}

//module.exports = LineAbsolute;