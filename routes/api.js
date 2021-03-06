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
        console.log("UPDATE " + req.body._id);
        doc.update(req.body._id, req.body.document, req.user._id,
            function(ret, id) {
                res.json({
                    message: ret,
                    id: id
                });
            });
    } else {
        doc.add(req.body.document, req.user._id,
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
    });
});

// Download document
router.get('/dl/:id.md', isLoggedIn, function(req, res) {
    doc.get(req.params.id, req.user._id, function(err, document) {
        if (!err) {
            res.header('Content-type', 'text/plain');
            res.header('Content-Disposition',
                'attachment; filename="' + document.title +
                '.md"');
            res.send("# " + document.title + "\n\n" + document.content);
        } else res.json(err);
    });
});

// Download pdf
router.get('/dl/:id.pdf', isLoggedIn, function(req, res) {
    doc.convert(req.params.id, req.user._id, 'pdf', function(error, path) {
        if (!error) {
            res.download(path, "Docapi-" + req.params.id +".pdf");
        } else res.render('error', {error});

    });
});

// Download docx
router.get('/dl/:id.docx', isLoggedIn, function(req, res) {
    doc.convert(req.params.id, req.user._id, 'docx', function(err, path) {
        if (!err) {
            res.download(path, "Docapi-" + req.params.id +
                ".docx");
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
        // if no auth works, redirect user
        else
            res.redirect('/user/login');
    });
}

module.exports = router;
