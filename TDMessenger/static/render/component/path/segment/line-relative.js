
'use strict';

function LineRelative(state, cmd) {
	state.relative(cmd.dx, cmd.dy);
	state.vertexAt();
}

//module.exports = LineRelative;