const express = require('express');
const port = 3000;
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./config/database');
require('./config/passport');
require('dotenv').config();

const app = express();

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.bodyParser())

/* app.use(session({
    secret: 'keyboard cat'
})); */
app.use(session({ 
    secret: 'cKDob5XDH5IazBR1U2Az1rRE6bn75gIMNhxL7gY', 
    key: 'YBrkVG1vL9Te8NywecFtjQ', 
    cookie: { secure: false },
    resave: true,
    saveUninitialized: true }))

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/books', booksRouter);

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});