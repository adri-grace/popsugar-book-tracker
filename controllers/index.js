const Book = require('../models/book');

module.exports = {
    index
}
/* function index(req, res) {
    res.render('index');
} */
function index(req, res) {
    Book.find({}, function(err, books) {
        res.render('/', {title: 'My Books', books})
    });
}