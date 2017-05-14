const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    date: Date,
    status: String
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;