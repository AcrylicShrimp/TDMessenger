
'use strict';

function MoveRelative(state, cmd) {
	state.relative(cmd.dx, cmd.dy);
}

//module.exports = MoveRelative;