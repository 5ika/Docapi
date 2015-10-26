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

// ADD/UPDATE shared document
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
                id: id,
                redirectToEdit: true
            });
        });
    }
})

// Download shared document
router.get('/dl/:identifiant.md', function(req, res) {
    doc.getShared(null, req.params.identifiant, function(err, document) {
        console.log(document);
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
router.get('/dl/:identifiant.pdf', function(req, res) {
    doc.convertShared(req.params.identifiant, function(err, path) {
        if (!err) {
            res.download(path, req.params.identifiant + ".pdf");
        } else res.json(err);

    });
});

// Delete shared document
router.delete('/:id', function(req, res) {
    doc.delShared(req.params.id, function(ret) {
        res.json({
            message: ret
        });
    })
})

module.exports = router;
