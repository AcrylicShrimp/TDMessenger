
'use strict';

function VerticalAbsolute(state, cmd) {
	state.absoluteY(cmd.y);
	state.vertexAt();
}

//module.exports = VerticalAbsolute;