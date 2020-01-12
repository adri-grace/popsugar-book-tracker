const Book = require('../models/book');
const Category = require('../models/category');
const User = require('../models/user');

module.exports = {
    new: newBook,
    create,
    index,
    deleteBook,
    editBook
};

function editBook(req, res) {
    Book.findById(req.params.id, function(err, book) {
        res.render('books/edit', { title: 'Edit Book', book, user: req.user });
    });
    /* const user = User.findById(req.user._id, function (err, user) {
        user.book.find(req.params.id, function (err, book) {
            res.render('/books/edit', { title: 'Edit Book' })
        }); 
        console.log(req.params.id);
    }); */
}
function deleteBook(req, res) {
    console.log(req.params.id);
    const user = User.findById(req.user._id, function (err, user) {
        user.book.remove(req.params.id);
        user.save(function (err) {
            res.redirect('/books');
        });
    });
}

function index(req, res) {
    User.findById(req.user._id).populate('book').exec(function (err, user) {
        res.render('books/index', { title: 'My books', user });
    });
}

function newBook(req, res) {
    res.render('books/new', { title: 'Add a Book', user: req.user });
}

function create (req, res) {
    const user = User.findById(req.user._id, function(err, user){

// take req.body and separate out req.body.title and req.body.author and place in separate object
// take req.body.review and put it an a separate object, too
// take req.body.category and put it an a 3rd object
// create book
// push review into review array
// save the book document
// create category-check to see if exists first
    // if so doesn't, needs to be created
    // if it does exist, associate/reference it
// take same book document and reference the category
// save book document again
// redirect back to home page
    const {title, author, review, content, rating, category} = req.body;
    let book = {title, author}, 
        bookReview={review, content, rating}, 
        bookCategory={genre: category};
    const newBook = new Book(book); // this is called 'casting'
    newBook.reviews.push(bookReview);
    console.log(bookCategory);
        Category.findOne({genre: bookCategory}, function(err, category){
            if (category) {
                newBook.category.push(bookCategory._id)
            } else if (!category) {
                Category.create(bookCategory, function(err, category){
                    newBook.category.push(bookCategory._id);
                } )
            }
        })
        newBook.save(function() {
            user.book.push(newBook._id);
            user.save(function(){
                res.redirect('/books');
            });
        })
    });
}