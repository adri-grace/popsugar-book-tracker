const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    displayName: String,
    goodreadsId: String,
    book: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);