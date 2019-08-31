
'use strict';

function Bezier2(from, to, p0, t) {
	const temp = 1 - t;
	return temp * temp * from + 2 * t * temp * p0 + t * t * to;
}

function Bezier3(from, to, p0, p1, t) {
	const temp = 1 - t;
	return temp * temp * temp * from + 3 * p0 * t * temp * temp + 3 * p1 * t * t * temp + to * t * t * t;
}

function Bezier4(from, to, p0, p1, p2, t) {
	const temp = 1 - t;
	return temp * temp * temp * temp * from + 4 * t * temp * temp * temp * p0 + 6 * t * t * temp * temp * p1 + 4 * t * t * t * temp * p2 + t * t * t * t * to;
}

function splitBezier2(fromX, fromY, toX, toY, p0X, p0Y, quality, callback) {
	const qualityInv = 1 / quality;

	for (let n = 1; n <= quality; ++n)
		callback(
			Bezier2(fromX, toX, p0X, n * qualityInv),
			Bezier2(fromY, toY, p0Y, n * qualityInv));
}

function splitBezier3(fromX, fromY, toX, toY, p0X, p0Y, p1X, p1Y, quality, callback) {
	const qualityInv = 1 / quality;

	for (let n = 1; n <= quality; ++n)
		callback(
			Bezier3(fromX, toX, p0X, p1X, n * qualityInv),
			Bezier3(fromY, toY, p0Y, p1Y, n * qualityInv));
}

function splitBezier4(fromX, fromY, toX, toY, p0X, p0Y, p1X, p1Y, p2X, p2Y, quality, callback) {
	const qualityInv = 1 / quality;

	for (let n = 1; n <= quality; ++n)
		callback(
			Bezier4(fromX, toX, p0X, p1X, p2X, n * qualityInv),
			Bezier4(fromY, toY, p0Y, p1Y, p2Y, n * qualityInv));
}

//module.exports = {
//	Bezier2     : Bezier2,
//	Bezier3     : Bezier3,
//	Bezier4     : Bezier4,
//	splitBezier2: splitBezier2,
//	splitBezier3: splitBezier3,
//	splitBezier4: splitBezier4
//};