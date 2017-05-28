const express = require('express');
const Auth = require('./../../auth');
const { DoctorRepo } = require('./../../repository');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    if (req.body && req.body.login && req.body.pass) {
        DoctorRepo
            .get({login: req.body.login})
            .then(result => {
                if (result.ok && result.data.length > 0) {
                    req.body.data = req.body;
                    return Promise.resolve(req.body);
                } else {
                    return DoctorRepo.add(req.body);
                }
            })
            .then(user => Auth.authenticate(user.data))
            .then(token => {
                if (token.ok) {
                    return res.json(token);
                } else {
                    return Promise.reject(token);
                }
            })
            .catch(err => next(err));
    } else {
        res.json({
            ok: false,
            message: 'Not all credentials provided.'
        });
    }
});

router.post('/login', (req, res, next) => {
    if (req.body && req.body.login && req.body.pass && req.body.token) {
        DoctorRepo
            .get({login: req.body.login})
            .then(user => {
                const userData = user.data && user.data[0];
                if (userData && userData.pass === req.body.pass) {
                    return Auth.verify(req.body.token);
                } else {
                    return Promise.reject({
                        ok: false,
                        message: 'Wrong credentials.'
                    });
                }
            })
            .then(result => res.json(result))
            .catch(err => next(err));
    } else {
        res.json({
            ok: false,
            message: 'Not all credentials provided.'
        });
    }
});

module.exports = router;