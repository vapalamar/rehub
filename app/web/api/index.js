const router = require('express').Router();
const guard = require('./../guard');

router.use(guard);
router.use('/v1', require('./v1'));

module.exports = router;