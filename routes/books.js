const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

router.get('/new', ensureAuthenticated, booksCtrl.new);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

module.exports = router;