var Document = require('../models/document');
var SharedDocument = require('../models/sharedDocument');
var shell = require('shelljs');
var fs = require('fs');

var doc = new Object();

// Ajouter un document
doc.add = function(document, userID, callback) {
    var newDoc = new Document({
        date: Date.now(),
        title: document.title,
        content: document.content,
        user: userID,
        toc: document.toc,
        context: document.context,
        username: document.username
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

// Ajouter un document partagé
doc.addShared = function(document, callback) {
    var newDoc = new SharedDocument({
        identifiant: document.identifiant,
        date: Date.now(),
        title: document.title,
        content: document.content,
        user: null,
        toc: document.toc,
        context: document.context,
        username: document.username
    });
    newDoc.save(function(err) {
        if (err) {
            callback(err, 0);
        }
        SharedDocument.findOne({
            title: newDoc.title,
            date: newDoc.date
        }, function(err, document) {
            callback('Document partagé ajouté', document._id);
        })
    });
}

// Modifier un document
doc.update = function(id, document, userID, callback) {
    Document.findOneAndUpdate({
        _id: id,
        user: userID
    }, {
        date: Date.now(),
        title: document.title,
        content: document.content,
        toc: document.toc,
        context: document.context,
        username: document.username
    }, function(err) {
        if (err) callback({
            message: err
        });
        else callback("Document sauvé", id);
    })
}

// Modifier un document partagé
doc.updateShared = function(id, document, callback) {
    SharedDocument.findOneAndUpdate({
        _id: id
    }, {
        date: Date.now(),
        title: document.title,
        content: document.content,
        toc: document.toc,
        context: document.context,
        username: document.username
    }, function(err) {
        if (err) callback({
            message: err
        });
        else callback("Document partagé sauvé", id);
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

// Récupérer un document partagé
doc.getShared = function(id, identifiant, callback) {
    console.log("ID : " + identifiant);
    var filters = {
        _id: id
    }
    if (identifiant) filters = {
        identifiant: identifiant
    }
    SharedDocument.findOne(filters, function(err, document) {
        callback(err, document);
    })
}

// Convertir un document en PDF pour récupération
doc.convert = function(id, userID, callback) {
    Document.findOne({
        _id: id,
        user: userID
    }, function(err, document) {
        var now = new Date();
        var date = now.getDate() + "/" + (now.getMonth() + 1) +
            "/" + now.getFullYear();
        var header =
            "---\ntitle: '" + document.title +
            "'\nauthor: '" + document.username +
            "'\ndate: '" + date;
        if (document.context)
            header += "'\nHautGauche: '" + document.context;
        if (document.username)
            header += "'\nHautDroit: '" + document.username;
        if (document.toc)
            header += "'\ntoc: 'true";
        header += "'\ndocumentclass: 'report'\n...";
        var contenu = header + "\n" + document.content;
        fs.writeFile("tmp/" + id + ".md", contenu, function(
            err) {
            if (!err) {
                shell.exec("pandoc tmp/" + id +
                    ".md -o tmp/" + id +
                    ".pdf --template template.latex -N --smart"
                );
            }
            callback(err, "tmp/" + id + ".pdf");
        })
    });
}

// Convertir un document partagé en PDF pour récupération
doc.convertShared = function(identifiant, callback) {
    SharedDocument.findOne({
        identifiant: identifiant,
    }, function(err, document) {
        var now = new Date();
        var date = now.getDate() + "/" + (now.getMonth() + 1) +
            "/" + now.getFullYear();
        var header =
            "---\ntitle: '" + document.title +
            "'\nauthor: '" + document.username +
            "'\ndate: '" + date;
        if (document.context)
            header += "'\nHautGauche: '" + document.context;
        if (document.username)
            header += "'\nHautDroit: '" + document.username;
        if (document.toc)
            header += "'\ntoc: 'true";
        header += "'\ndocumentclass: 'report'\n...";
        var contenu = header + "\n" + document.content;
        fs.writeFile("tmp/" + identifiant + ".md", contenu,
            function(
                err) {
                if (!err) {
                    shell.exec("pandoc tmp/" + identifiant +
                        ".md -o tmp/" + identifiant +
                        ".pdf --template template.latex -N --smart"
                    );
                }
                callback(err, "tmp/" + identifiant + ".pdf");
            })
    });
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
        if (!err) callback(
            "Le document a bien été supprimé");
        else callback('Pas de document avec cet id');
    })
}

// Supprimer un document partagé
doc.delShared = function(id, callback) {
    SharedDocument.findOneAndRemove({
        _id: id
    }, function(err, document) {
        if (!err) callback(
            "Le document partagé a bien été supprimé");
        else callback('Pas de document avec cet id');
    })
}

// Supprimer tous les documents d'un utilisateur
doc.delUser = function(userID, callback) {
    Document.find({
        user: userID
    }, function(err, list) {
        list.forEach(function(document) {
            document.remove();
        });
        callback();
    })
}

module.exports = doc;
