const express = require('express');
const { DoctorRepo } = require('./../../../repository');
const router = express.Router();

router.post('/', (req, res, next) => {
    const doctor = req.body.doctor || {};
    DoctorRepo
        .get({login: doctor.login})
        .then(result => {
            if (result.ok && result.data.length > 0) {
                const err = new Error('Failed to create a new doctor: there is a similar record already.');
                const errObj = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

                return Promise.reject({ok: false, err: errObj});
            } else {
                return DoctorRepo.add(req.body.doctor);
            }
        })
        .then(result => res.json(result))
        .catch(err => next(err));
});

router.put('/', (req, res, next) => {
    const doctor = req.body || {};
    if (!doctor) {
        const err = {message: 'Doctor has to be provided.'};
        return next(err);
    }

    DoctorRepo
        .update(doctor)
        .then(result => {
            const response = result.ok ? res.json(result) : next(result);
            return response;
        })
        .catch(err => next(err));
});

router.delete('/', (req, res, next) => {
    const doctor = req.body.doctor || {};
    if (!doctor) {
        const err = {message: 'Doctor has to be provided.'};
        return next(err);
    }

    DoctorRepo
        .delete(req.body.doctor)
        .then(result => {
            const response = result.ok ? res.json(result) : next(result);
            return response;
        })
        .catch(err => next(err));
});

router.get('/:login', (req, res, next) => {
    DoctorRepo
        .get({login: req.params.login})
        .then(result => {
            const response = result.ok ? res.json(result) : next(result);
            return response;
        })
        .catch(err => next(err));
});

router.get('/', (req, res, next) => {
    DoctorRepo
        .get()
        .then(queryRes => {
            const response = queryRes.ok ? res.json(queryRes) : next(queryRes);
            return response;
        })
        .catch(err => next(err));
});

module.exports = router;