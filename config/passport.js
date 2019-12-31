const express = require('express');
const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;

const GOODREADS_KEY = "--insert-goodreads-key-here--"
const GOODREADS_SECRET = "--insert-goodreads-secret-here--";

passport.use(new GoodreadsStrategy({
    consumerKey: GOODREADS_KEY,
    consumerSecret: GOODREADS_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/goodreads/callback"
},
    function (token, tokenSecret, profile, done) {
        User.findOrCreate({ goodreadsId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});