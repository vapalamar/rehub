const express = require('express');
const path = require('path');
const router = express.Router();

router.use(express.static(path.join(__dirname, 'public/dist')));
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/public/dist/index.html');
});

module.exports = router;