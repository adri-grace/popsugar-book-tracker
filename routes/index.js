const router = require('express').Router();
const passport = require('passport');

router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});
router.get('/login', function (req, res) {
    res.render('login', { user: req.user });
});
router.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});
router.get('/auth/goodreads',
    passport.authenticate('goodreads'));

router.get('/auth/goodreads/callback',
    passport.authenticate('goodreads', {failureRedirect: '/login'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
    console.log('hello world');
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}
module.exports = router;