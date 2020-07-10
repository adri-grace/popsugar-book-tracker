const router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

router.get('/auth/goodreads',
    passport.authenticate('goodreads'));

router.get('/auth/goodreads/callback',
    passport.authenticate('goodreads', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/books');
    });
router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
});


router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/books',
        failureRedirect: '/'
    }
));

module.exports = router;