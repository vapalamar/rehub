const Auth = require('./../../auth');

function guard(req, res, next) {
    const token = req.body.token || req.query.token || req.params.token;

    if (token) {
        req.body.token = token;
        Auth.verify(token)
            .then(_ => next())
            .catch(err => res.json(err));
    } else {
        res.status(403).json({
            ok: false,
            message: 'No token provided.'
        });
    }
}

module.exports = guard;