var express = require('express');
var appInfo = require('../config').app;
var tokenAuth = require('../config/token');
var router = express.Router();

var doc = require("../config/doc");

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
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.json({
        error: 'No Auth'
    });
}

module.exports = router;
