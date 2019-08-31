
'use strict';

const router = require('express').Router();

router.get('/', function(req, res) {
	res.redirect('./main.html', 301);
});

module.exports = router;