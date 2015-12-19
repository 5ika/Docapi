var express = require('express');
var router = express.Router();
var passport = require('passport');
var tokenAuth = require('../config/token');
var User = require('../config/user-model');
var doc = require("../config/doc");

router.get('/', function(req, res) {
    res.redirect('/user/profile');
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login', {
        message: req.flash('loginMessage')
    });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/user/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {
    console.log(req.body);

    // render the page and pass in any flash data if it exists
    res.render('signup', {
        message: req.flash('signupMessage')
    });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user/profile', // redirect to the secure profile section
    failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// =====================================
// PROFILE SECTION =====================
// =====================================
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user: req.user // get the user out of session and pass to template
    });
});

// =====================================
// GET A TOKEN =========================
// =====================================
router.get('/:user/token', isLoggedIn, function(req, res) {
    var token = tokenAuth.getToken(req.params.user);
    res.send({
        'token': token.value,
        'expire': token.expire,
        'user': token.user
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/user/login');
});

// =====================================
// DELETE USER?=========================
// =====================================
router.get('/delete', function(req, res) {
    deleteUser(req, function(err) {
        if (!err) {
            req.logout();
            res.render('login', {
                message: "L'utilisateur " + req.user.local
                    .name + " a bien été supprimé"
            });
        } else res.render('profile', {
            user: req.user,
            message: "Impossible de supprimer l'utilisateur"
        });
    });

});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/user/login');
}

// Remove an user in the DB
function deleteUser(req, callback) {
    var userID = req.user._id;
    console.log("Suppression des documents pour l'utilisateur " + userID);
    doc.delUser(userID, function() {
        console.log("Suppression de l'utilisateur " + userID);
        User.remove({
            _id: userID
        }, function(err) {
            callback(err);
        });
    });
}

module.exports = router;
