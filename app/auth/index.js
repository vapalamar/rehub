const jwt = require('jsonwebtoken');
const { DoctorRepo } = require('./../repository');
const config = require('./config');

class Auth {
    authenticate(user) {
        const query = {login: user.login};

        return DoctorRepo
            .get(query)
            .then(response => {
                if (response.data.length > 0 && response.ok) {
                    if (response.data[0].pass !== user.pass) {
                        return {
                            ok: false,
                            message: 'Authentication failed. Wrong password.'
                        };
                    }

                    const userData = {
                        login: user.login,
                        pass: user.pass,
                        patients: user.patients || [],
                        link: user.link || []
                    };

                    const token = jwt.sign(userData, process.env.AUTH_SECRET, config);

                    return {
                        ok: true,
                        message: 'Success. Here is your token.',
                        token: token
                    };
                }
            })
            .catch(err => console.error(err));
    }

    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
                if (err) {
                    reject({
                        ok: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    resolve({
                        ok: true,
                        message: 'Successfully authenticated token.',
                        data: decoded,
                    });
                }
            });
        });
    }
}

module.exports = new Auth();