const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    fname: String,
    lname: String,
    login: String,
    pass: String,
    patients: [],
    link: [String]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;