
'use strict';

function VerticalRelative(state, cmd) {
	state.relativeY(cmd.dy);
	state.vertexAt();
}

//module.exports = VerticalRelative;