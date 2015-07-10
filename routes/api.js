var express = require('express');
var appInfo = require('../config').app;
var tokenAuth = require('../config/token');
var router = express.Router();

var doc = require("../config/doc");

// Présentation de l'API
router.get('/', function(req, res) {
    res.render('index', {
        title: appInfo.name
    });
});

//Add a new document or modify one existent
router.post('/', isLoggedIn, function(req, res) {
    if (req.body._id) {
        console.log("UPDATE " + req.body._id)
        doc.update(req.body._id, req.body.title, req.body.content, req.user
            ._id,
            function(ret, id) {
                res.json({
                    message: ret,
                    id: id
                });
            });
    } else {
        doc.add(req.body.title, req.body.content, req.user._id,
            function(ret, id) {
                console.log("ADD " + id);
                res.json({
                    message: ret,
                    id: id,
                    redirectToEdit: true
                });
            });
    }
});

// Get document
router.get('/:id', isLoggedIn, function(req, res) {
    doc.get(req.params.id, req.user._id, function(err, document) {
        if (err) res.json(err);
        else res.json(document);
    });
});

// Get documents list
router.get('/list/all', isLoggedIn, function(req, res) {
    console.log(req.user);
    doc.getList(req.user._id, function(data) {
        res.json(data);
    });
});

// Delete document
router.delete('/:id', isLoggedIn, function(req, res) {
    doc.del(req.params.id, req.user._id, function(ret) {
        res.json({
            message: ret
        });
    })
})

// Download document
router.get('/dl/:id.txt', isLoggedIn, function(req, res) {
    doc.get(req.params.id, req.user._id, function(err, document) {
        if (!err) {
            res.header('Content-type', 'text/plain');
            res.header('Content-Disposition',
                'attachment; filename="' + document.title +
                '.txt"');
            res.send("# " + document.title + "\n\n" + document.content);
        } else res.json(err);
    });
});

// route middleware to make sure a user is logged in
//// First try a token auth, then an auth with email/password
function isLoggedIn(req, res, next) {
    var userToken = (req.body && req.body.access_token) || (req.query && req.query
        .access_token) || req.headers['x-access-token'];

    // Auth by token
    tokenAuth.isValid(userToken, function(user) {
        if (user) {
            req.user = user;
            return next();
        }
        // Auth by email/password
        else if (req.isAuthenticated()) {
            console.log("PASSWORD MAIL");
            return next();
        }
        // if no auth works, send error
        else
            res.json({
                error: 'No Auth'
            });
    })
}

module.exports = router;
