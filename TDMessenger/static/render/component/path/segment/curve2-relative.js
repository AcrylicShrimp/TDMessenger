
'use strict';

//const curve = require('./curve');

function Curve2Relative(state, cmd) {
	splitBezier2(0, 0, cmd.dx, cmd.dy, cmd.dx1, cmd.dy1, state.quality, (dx, dy) => {
		state.relative(dx, dy);
		state.vertexAt();
	});
}

//module.exports = Curve2Relative;