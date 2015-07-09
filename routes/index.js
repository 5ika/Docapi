var express = require('express');
var appInfo = require('../package.json')
var router = express.Router();
var doc = require("../config/doc");

router.get('/', function(req, res) {
	res.render('editor');
})

router.get('/:id', function(req, res) {
	doc.get(req.params.id, function(err, document) {
		if (!err) res.render('editor', document);
		else res.json({
			error: 'Wrong ID'
		});
	})
})

module.exports = router;
