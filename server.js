const express = require('express');
const port = 3000;
const morgan = require('morgan');
/* const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport'); */

require('./config/database');
require('dotenv').config();

const app = express();

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(morgan('dev'));
/* app.use(methodOverride('_method')); */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});