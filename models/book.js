const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 5 }
}, {
    timestamps: true
});
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    category: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);