const Book = require('../models/book');
const Category = require('../models/category');
const User = require('../models/user');

module.exports = {
    new: newBook,
    create,
    index,
    deleteBook,
    editBook,
    update
};

function update(req, res) {
          Book.findById(req.params.id, function(err, book) {
                book.title = req.body.title;
                book.author = req.body.author;
                book.reviews[0].rating = req.body.rating;
                book.reviews[0].content = req.body.content;
                console.log(req.body);
                book.save(function(err, book) {
                    res.redirect('/books');
                })
            });

}
function editBook(req, res) {
    Book.findById(req.params.id).populate('category').exec(function (err, book) {
        res.render('books/edit', { title: 'Edit Book', book, user: req.user });
    });
}
function deleteBook(req, res) {
    const user = User.findById(req.user._id, function (err, user) {
        user.book.remove(req.params.id);
        user.save(function (err) {
            res.redirect('/books');
        });
    });
}

function index(req, res) {
    User.findById(req.user._id, function (err, user) {
        Book.find({ '_id': { $in: user.book } }).populate('category').exec(function (err, books) {
            res.render('books/index', { title: 'My books', user: req.user, books });
        })
    });
}

function newBook(req, res) {
    res.render('books/new', { title: 'Add a Book', user: req.user });
}

function create (req, res) {
    const user = User.findById(req.user._id, function(err, user){
    const {title, author, review, content, rating, category} = req.body;
    let book = {title, author}, 
        bookReview={review, content, rating}, 
        bookCategory={genre: category};
    const newBook = new Book(book); // this is called 'casting'
    newBook.reviews.push(bookReview);
        Category.findOne({genre: bookCategory.genre }, function(err, category){
            if (category !== null) {
                newBook.category = category._id;
                newBook.save(function (err) {
                    user.book.push(newBook._id);
                    user.save(function () {
                        res.redirect('/books');
                    });
                });
            } else if (category === null) {
                Category.create(bookCategory, function(err, category){
                    newBook.category = category._id;
                    newBook.save(function (err) {
                        user.book.push(newBook._id);
                        user.save(function () {
                            res.redirect('/books');
                        });
                    });
                });
            }
        })
    });
}