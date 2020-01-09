const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    published2020: Boolean,
    transAuthor: Boolean,
    greatFirstLine: Boolean,
    aboutBookClub: Boolean,
    olympicCity: Boolean,
    bildungsroman: Boolean,
    eyesClosed: Boolean,
    upsideDownImage: Boolean,
    withMap: Boolean,
    onlineRecommendation: Boolean,
    anthology: Boolean,
    passesBechdel: Boolean,
    sameTitleUnrelated: Boolean,
    floraFaunaAuthorName: Boolean,
    involvingSocialMedia: Boolean,
    bookOnCover: Boolean,
    medicalThriller: Boolean,
    madeupLanguage: Boolean,
    countryStartsWithC: Boolean,
    titleCaughtAttention: Boolean,
    publishedBirthMonth: Boolean,
    womanInStem: Boolean,
    award2019: Boolean,
    unknownSubject: Boolean,
    coverOnlyWords: Boolean,
    titlePun: Boolean,
    featuresSin: Boolean,
    artificialCharacter: Boolean,
    birdCover: Boolean,
    aboutWorldLeader: Boolean,
    goldSilverBronze: Boolean,
    authorWomanOfColor: Boolean,
    goodreadsFourStar: Boolean,
    meantToRead2019: Boolean,
    threeWordTitle: Boolean,
    pinkCover: Boolean,
    western: Boolean,
    byAboutJournalist: Boolean,
    banned: Boolean,
    favPrompt: Boolean,
    authorIn20s: Boolean,
    title20Twenty: Boolean,
    visionImpairedCharacter: Boolean,
    inJapan: Boolean,
    setIn20s: Boolean,
    authorWrittenMoreThan20: Boolean,
    titleMoreThan20Letters: Boolean,
    published20thCentury: Boolean,
    seriesMoreThan20: Boolean,
    characterIn20s: Boolean
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
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    category: [categorySchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);