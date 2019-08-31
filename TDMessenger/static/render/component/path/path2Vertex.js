
'use strict';

//const State = require('./state');

const command = {
	Z: Cut,

	M: MoveAbsolute,
	m: MoveRelative,

	H: HorizontalAbsolute,
	h: HorizontalRelative,
	V: VerticalAbsolute,
	v: VerticalRelative,
	L: LineAbsolute,
	l: LineRelative,

	Q: Curve2Absolute,
	q: Curve2Relative,
	T: SymCurve2Absolute,
	t: SymCurve2Relative,
	C: Curve3Absolute,
	c: Curve3Relative,
	S: SymCurve3Absolute,
	s: SymCurve3Relative,
};

function handleSegment(state, cmd, cmdPrev) {
	command[cmd.type](state, cmd, cmdPrev);
}

//handleSegment.prototype.command = {
//	Z: require('./segment/cut'),
//
//	M: require('./segment/move-absolute'),
//	m: require('./segment/move-relative'),
//
//	H: require('./segment/horizontal-absolute'),
//	h: require('./segment/horizontal-relative'),
//	V: require('./segment/vertical-absolute'),
//	v: require('./segment/vertical-relative'),
//	L: require('./segment/line-absolute'),
//	l: require('./segment/line-relative'),
//
//	Q: require('./segment/curve2-absolute'),
//	q: require('./segment/curve2-relative'),
//	T: require('./segment/symcurve2-absolute'),
//	t: require('./segment/symcurve2-relative'),
//	C: require('./segment/curve3-absolute'),
//	c: require('./segment/curve3-relative'),
//	S: require('./segment/symcurve3-absolute'),
//	s: require('./segment/symcurve3-relative'),
//};

function path2Vertex(path, scale, quality) {
	const state = new State(scale, quality);

	for (let index = 0, cmdPrev = undefined; index < path.commands.length; ++index) {
		handleSegment(state, path.commands[index], cmdPrev);
		cmdPrev = path.commands[index];
	}

	let vertex      = [];
	let vertexIndex = [];
	
	for (let index = 0; index < state.vertex.length; ++index) {
		const baseIndex   = vertex.length / 2;
		let   beginIndex  = vertexIndex.length;
		      vertex      = vertex.concat(state.vertex[index]);
		      vertexIndex = vertexIndex.concat(earcut(state.vertex[index], [], 2));
			  
		for (; beginIndex < vertexIndex.length; ++beginIndex)
			vertexIndex[beginIndex] += baseIndex;
	}

	return {
		vertex: vertex,
		index : vertexIndex
	};
}

//module.exports = path2Vertex;