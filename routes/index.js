const router = require('express').Router();
const passport = require('passport');

const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index);

module.exports = router;