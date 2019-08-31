
'use strict';

const md5 = require('md5');

function HSV2RGB(h, s, v) {
	
	h = h < 0 ? 0 : h > 360 ? 360 : h;
	s = s < 0 ? 0 : s > 1 ? 1 : s;
	v = v < 0 ? 0 : v > 1 ? 1 : v;

	const h60 = h / 60;
	const f   = h60 - Math.floor(h60);

	const x = v * (1 - s);
	const y = v * (1 - f * s);
	const z = v * (1 - (1 - f) * s);

	switch (Math.floor(h60) % 6) {
		case 0      : return [v, z, x, 1];
		case 1      : return [y, v, x, 1];
		case 2      : return [x, v, z, 1];
		case 3      : return [x, y, v, 1];
		case 4      : return [z, x, v, 1];
		     default: return [v, x, y, 1];
	}
};

function hashColor(str) {
	const hash = md5(str);
	
	let h = 
		(parseInt(hash[0] + hash[1], 16) +
		parseInt(hash[2] + hash[3], 16) +
		parseInt(hash[4] + hash[5], 16)) / 8;
		
	h = h > 50 ? h - 50 : h;
	h *= 7;
	
	return HSV2RGB(h, .5, .9);
};

module.exports = hashColor;