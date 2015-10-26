var express = require('express');
var appInfo = require('../package.json');
var router = express.Router();
var doc = require("../config/doc");

router.get('/', function(req, res) {
    doc.getShared(req.params.id, null, function(err, document) {
        if (!err)
            res.render('newShared');
        else res.json(err);
    })
})

router.get('/:identifiant', function(req, res) {
    doc.getShared(null, req.params.identifiant, function(err, document) {
        if (!err) {
            res.render('share', {
                document: document,
                identifiant: req.params.identifiant
            });
        } else res.json(err);
    })
})

router.post('/', function(req, res) {
    if (req.body._id) {
        console.log("UPDATE " + req.body._id)
        doc.updateShared(req.body._id, req.body.document,
            function(ret, id) {
                res.json({
                    message: ret,
                    id: id
                });
            });
    } else {
        doc.addShared(req.body.document, function(ret, id) {
            console.log("ADD " + id);
            res.json({
                message: ret,
                id: id
            });
        });
    }
})

module.exports = router;
