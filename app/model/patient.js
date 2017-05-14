const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    fname: String,
    lname: String,
    login: String,
    pass: String,
    symptoms: [],
    progress: String,
    link: [String]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;