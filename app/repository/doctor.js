const {Doctor} = require('./../model');

class DoctorRepo {
    get(query = {}) {
        return Doctor
            .find(query)
            .then((data) => { 
                return {ok: true, data: data}; 
            })
            .catch(err => { 
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, data: [], err: errObj}; 
            });
    }

    add(doctor = {}) {
        const docRecord = Doctor(doctor);

        return docRecord
            .save(docRecord)
            .then(_ => {
                return {ok: true, message: 'Successfully created a new doctor.'};
            })
            .catch(err => {
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, err: errObj};
            });
    }

    update(doctor = {}) {
        return Doctor
            .findOneAndUpdate({login: doctor.login}, doctor)
            .then(data => {
                if (data === null) {
                    const err = new Error('There is no such doctor.');
                    const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                    return Promise.reject({ok: false, err: errObj});
                }

                return {ok: true, message: 'Successfully updated the doctor.'};
            })
            .catch(err => {
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, err: errObj};
            });
    }

    delete(doctor = {}) {
        return Doctor
            .findOneAndRemove({login: doctor.login})
            .then(data => {
                if (data === null) {
                    const err = new Error('There is no such doctor.');
                    const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                    return Promise.reject({ok: false, err: errObj});
                }

                return {ok: true, message: 'Successfully deleted the doctor.'};
            })
            .catch(err => {
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, err: errObj};
            });
    }
}

module.exports = new DoctorRepo();