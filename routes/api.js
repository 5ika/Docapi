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
router.post('/', function(req, res) {
    if (req.body._id) {
        console.log("UPDATE " + req.body._id)
        doc.update(req.body._id, req.body.title, req.body.content,
            function(ret, id) {
                res.json({
                    message: ret,
                    id: id
                });
            });
    } else {
        doc.add(req.body.title, req.body.content, function(ret, id) {
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
router.get('/:id', function(req, res) {
    doc.get(req.params.id, function(err, document) {
        if (err) res.json(err);
        else res.json(document);
    });
});

// Get documents list
router.get('/list/all', function(req, res) {
    doc.getList(function(data) {
        res.json(data);
    });
});

// Delete document
router.delete('/:id', function(req, res) {
    doc.del(req.params.id, function(ret) {
        res.json({
            message: ret
        });
    })
})

router.get('/infos', tokenAuth.isValidToken, function(req, res) {
    res.send("{ok}");
});

module.exports = router;
