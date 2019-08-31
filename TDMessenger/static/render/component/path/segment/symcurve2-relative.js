
'use strict';

//const curve = require('./curve');

function SymCurve2Relative(state, cmd, cmdPrev) {
	splitBezier2(0, 0, cmd.dx, cmd.dy, cmdPrev.dx - cmdPrev.dx1, cmdPrev.dy - cmdPrev.dy1, state.quality, (dx, dy) => {
		state.relative(dx, dy);
		state.vertexAt();
	});
}

//module.exports = SymCurve2Relative;