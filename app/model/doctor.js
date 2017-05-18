const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    fname: String,
    lname: String,
    login: String,
    pass: String,
    patients: [{type: Schema.ObjectId, ref: 'Patient'}],
    link: [{type: Schema.ObjectId, ref: 'Link'}]
});

DoctorSchema.statics.get = function getDoctor(query = {}) {
    return this.find(query)
        .then(data => data)
        .catch(err => console.log(err));
};

DoctorSchema.statics.add = function addDoctor(doctor = {}) {
    const docRecord = this.model('Doctor')(doctor);

    return docRecord
        .save(docRecord)
        .then(data => data)
        .catch(err => console.log(err));
};

DoctorSchema.statics.update = function updateDoctor(doctor = {}) {
    return this.findOneAndUpdate({login: doctor.login}, doctor)
        .then(data => {
            if (data === null) {
                throw new Error('There is no such doctor.');
            }

            return data;
        })
        .catch(err => console.log(err));
};

DoctorSchema.statics.delete = function deleteDoctor(doctor = {}) {
    return this.findOneAndRemove({login: doctor.login})
        .then(data => {
            if (data === null) {
                throw new Error('There is no such doctor.');
            }

            return data;
        })
        .catch(err => console.log(err));
};

DoctorSchema.statics.getAllPatients = function getAllDoctorPatients(doctor) {
    return this.find({login: doctor.login})
        .then(data => data.patients || [])
        .catch(err => console.log(err));
};

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;