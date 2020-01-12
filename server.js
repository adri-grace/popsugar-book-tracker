// Require modules
const express = require('express');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// Connect to DB, Passport, and set up .env
require('./config/database');
require('./config/passport');
require('dotenv').config();

// Set up express app
const app = express();

// Require routes
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

// Configure Express App app.set()
app.set('view engine', 'ejs');

// Mount middleware app.use()
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'cKDob5XDH5IazBR1U2Az1rRE6bn75gIMNhxL7gY', 
    key: 'YBrkVG1vL9Te8NywecFtjQ', 
    cookie: { secure: false },
    resave: true,
    saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// Mount Routes app.use()
app.use('/', indexRouter);
app.use('/books', booksRouter);

// Tell App to listen
app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});