
'use strict';

function HorizontalRelative(state, cmd) {
	state.relativeX(cmd.dx);
	state.vertexAt();
}

//module.exports = HorizontalRelative;