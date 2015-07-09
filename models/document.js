var mongoose = require('mongoose');
var documentSchema = mongoose.Schema({
    date: Number,
    title: String,
    content: String
});

module.exports = mongoose.model("Document", documentSchema);
