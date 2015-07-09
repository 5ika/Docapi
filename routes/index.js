var express = require('express');
var appInfo = require('../package.json')
var router = express.Router();
var doc = require("../config/doc");

router.get('/', isLoggedIn, function(req, res) {
	doc.getList(function(list) {
		res.render('editor', {
			list: list
		});
	});
})

router.get('/:id', isLoggedIn, function(req, res) {
	doc.get(req.params.id, function(err, document) {
		if (!err)
			doc.getList(function(list) {
				res.render('editor', {
					document: document,
					list: list
				});
			});
		else res.json({
			error: 'Wrong ID'
		});
	})
})

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/user/login');
}

module.exports = router;
