const express = require('express');
const Auth = require('./../../auth');

function guard(req, res, next) {
    const token = req.body.token || req.query.token;

    if (token) {
        Auth.verify(token)
            .then(result => next(result))
            .catch(err => res.json(err));
    } else {
        res.status(403).json({
            ok: false,
            message: 'No token provided.'
        });
    }
}

module.exports = guard;