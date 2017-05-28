const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    fname: String,
    lname: String,
    symptoms: [],
    progress: String,
    link: [String]
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;