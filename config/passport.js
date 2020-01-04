const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;
const User = require('../models/user');

const GOODREADS_KEY = "YBrkVG1vL9Te8NywecFtjQ"
const GOODREADS_SECRET = "cKDob5XDH5IazBR1U2Az1rRE6bn75gIMNhxL7gY";

passport.use(new GoodreadsStrategy({
    consumerKey: GOODREADS_KEY,
    consumerSecret: GOODREADS_SECRET,
    callbackURL: "http://localhost:3000/auth/goodreads/callback"
},
    function (token, tokenSecret, profile, done) {
        User.findOne({ goodreadsId: profile.id }, function (err, user) {
            console.log(user);
            // return done(err, user);
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
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});