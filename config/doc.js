var Document = require('../models/document');

var doc = new Object();

doc.add = function(titre, contenu, callback) {
    var newDoc = new Document({
        date: Date.now(),
        title: titre,
        content: contenu
    });
    newDoc.save(function(err) {
        if (err) {
            callback(err, 0);
        }
        Document.findOne({
            title: newDoc.title,
            date: newDoc.date
        }, function(err, document) {
            callback('Document ajouté', document._id);
        })
    });
}

doc.update = function(id, titre, contenu, callback) {
    Document.findOneAndUpdate({
        _id: id
    }, {
        date: Date.now(),
        title: titre,
        content: contenu
    }, function(err) {
        if (err) callback({
            message: err
        });
        else callback("Document sauvé", id);
    })
}

doc.get = function(id, callback) {
    Document.findOne({
        _id: id
    }, function(err, document) {
        callback(null, document);
    })
}

doc.getAll = function() {
    return tabDocJSON
}

doc.del = function(id, callback) {
    Document.findOneAndRemove(id, function(err, document) {
        if (!err) callback("Le document a bien été supprimé");
        else callback('Pas de document avec cet id');
    })
}

module.exports = doc;
