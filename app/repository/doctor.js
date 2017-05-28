const {Doctor} = require('./../model');

class DoctorRepo {
    get(query = {}) {
        return Doctor
            .get(query)
            .then((data) => { 
                return {ok: true, data: data}; 
            })
            .catch(err => { 
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, data: [], err: errObj}; 
            });
    }

    add(doctor = {}) {
        return Doctor
            .add(doctor)
            .then(doctor => {
                return {ok: true, message: 'Successfully created a new doctor.', data: doctor};
            })
            .catch(err => {
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, err: errObj};
            });
    }

    update(doctor = {}) {
        return Doctor
            .update(doctor)
            .then(data => {
                return {ok: true, message: 'Successfully updated the doctor.'};
            })
            .catch(err => {
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, err: errObj};
            });
    }

    delete(doctor = {}) {
        return Doctor
            .delete(doctor)
            .then(data => {
                return {ok: true, message: 'Successfully deleted the doctor.'};
            })
            .catch(err => {
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                return {ok: false, err: errObj};
            });
    }
}

module.exports = new DoctorRepo();