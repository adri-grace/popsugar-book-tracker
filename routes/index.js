const router = require('express').Router();
const passport = require('passport');

app.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

app.get('/auth/goodreads',
    passport.authenticate('goodreads'));

app.get('/auth/goodreads/callback',
    passport.authenticate('goodreads', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;