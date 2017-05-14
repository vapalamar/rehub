const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const client = require('./client');
const api = require('./api');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

app.use('/', client);
app.use('/api', api);

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;