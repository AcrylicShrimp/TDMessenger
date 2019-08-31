
'use strict';

//const curve = require('./curve');

function Curve2Absolute(state, cmd) {
	splitBezier2(state.x, state.y, cmd.x, cmd.y, cmd.x1, cmd.y1, state.quality, (x, y) => {
		state.absolute(x, y);
		state.vertexAt();
	});
}

//module.exports = Curve2Absolute;