var express = require('express');
var appInfo = require('../package.json')
var router = express.Router();
var doc = require("../config/doc");

//TEST
router.get('/crypto',function(req,res){
	res.render('crypto');
});

router.get('/', isLoggedIn, function(req, res) {
	doc.getList(req.user._id, function(list) {
		res.render('editor', {
			list: list,
			user: req.user.local.name
		});
	});
})

router.get('/:id', isLoggedIn, function(req, res) {
	doc.get(req.params.id, req.user._id, function(err, document) {
		if (!err)
			doc.getList(req.user._id, function(list) {
				res.render('editor', {
					document: document,
					list: list,
					user: req.user.local.name
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
