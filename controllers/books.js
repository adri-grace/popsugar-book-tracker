const Book = require('../models/book');
const Category = require('../models/category');

module.exports = {
    new: newBook,
    create
};

function newBook(req, res) {
    res.render('books/new', { title: 'Add a Book', user: req.user });
}

function create (req, res) {
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
    const {title, author, review, content, category} = req.body;
    let book = {title, author}, 
        bookReview={review, content}, 
        bookCategory={title: category};
    const newBook = new Book(book);
    newBook.reviews.push(bookReview);
    newBook.save(function(err, book){
        Category.findOne({title:bookCategory.title}, function(err, category){
            console.log(category, err);
            if (category) {
                newBook.category.push(category._id)
            } else if (!category) {
                Category.create(bookCategory, function(err, category){
                    console.log(err, category);
                    newBook.category.push(category._id);
                } )
            }
        })
        newBook.save(function(err, book) {
            console.log(book);
            res.redirect('/');
        })
    });
}