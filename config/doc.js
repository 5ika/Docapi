var Document = require('../models/document');

var doc = new Object();

// Ajouter un document
doc.add = function(titre, contenu, userID, callback) {
    var newDoc = new Document({
        date: Date.now(),
        title: titre,
        content: contenu,
        user: userID
    });
    newDoc.save(function(err) {
        if (err) {
            callback(err, 0);
        }
        Document.findOne({
            title: newDoc.title,
            date: newDoc.date,
            user: newDoc.user
        }, function(err, document) {
            callback('Document ajouté', document._id);
        })
    });
}

// Modifier un document
doc.update = function(id, titre, contenu, userID, callback) {
    Document.findOneAndUpdate({
        _id: id,
        user: userID
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

// Récupérer un document
doc.get = function(id, userID, callback) {
    Document.findOne({
        _id: id,
        user: userID
    }, function(err, document) {
        callback(null, document);
    })
}

// Récupérer la liste des documents
doc.getList = function(userID, callback) {
    Document.find({
        user: userID
    }, {
        content: 0,
        __v: 0
    }, {
        sort: {
            date: 'asc'
        }
    }, function(err, list) {
        if (!err) {
            callback(list);
        } else callback({
            error: 'Pas de document'
        });
    });
}

// Supprimer un document
doc.del = function(id, userID, callback) {
    Document.findOneAndRemove({
        _id: id,
        user: userID
    }, function(err, document) {
        if (!err) callback("Le document a bien été supprimé");
        else callback('Pas de document avec cet id');
    })
}

module.exports = doc;
