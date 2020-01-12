const Book = require('../models/book');

module.exports = {
    index
}

function index(req, res) {
    Book.find({}, function(err, books) {
        console.log(books);
        res.render('/', { title: 'My Books', books, user: req.user})
    });
}