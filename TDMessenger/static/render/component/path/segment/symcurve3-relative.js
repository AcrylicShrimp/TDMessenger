
'use strict';

//const curve = require('./curve');

function SymCurve3Relative(state, cmd) {
	splitBezier3(0, 0, cmd.dx, cmd.dy, cmdPrev.dx - cmdPrev.dx2, cmdPrev.dy - cmdPrev.dy2, cmd.dx2, cmd.dy2, state.quality, (dx, dy) => {
		state.relative(dx, dy);
		state.vertexAt();
	});
}

//module.exports = SymCurve3Relative;