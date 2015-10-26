var mongoose = require('mongoose');
var documentSchema = mongoose.Schema({
    identifiant: String,
    date: Number,
    title: String,
    content: String,
    user: [String],
    username: String,
    toc: Boolean,
    context: String
});

module.exports = mongoose.model("SharedDocument", documentSchema);
