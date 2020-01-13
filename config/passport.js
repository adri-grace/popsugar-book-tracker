const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;
const User = require('../models/user');


passport.use(new GoodreadsStrategy({
    consumerKey: process.env.GOODREADS_KEY,
    consumerSecret: process.env.GOODREADS_SECRET,
    callbackURL: process.env.GOODREADS_CALLBACK
},
    function (token, tokenSecret, profile, done) {
        User.findOne({ goodreadsId: profile.id }, function (err, user) {
            if (err) return done(err);
            if (user) {
                return done(null, user);
            } else {
                const newUser = new User({
                    displayName: profile.displayName,
                    goodreadsId: profile.id,
                });
                newUser.save(function (err) {
                    if (err) return done(err);
                    return done(null, newUser);
                })
            }
        });
        console.log(profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});