const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    date: Date
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;