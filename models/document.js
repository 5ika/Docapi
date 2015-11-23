var mongoose = require('mongoose');
var documentSchema = mongoose.Schema({
    date: Number,
    title: String,
    tags: [String],
    content: String,
    user: String,
    username: String,
    toc: Boolean,
    context: String
});

module.exports = mongoose.model("Document", documentSchema);
