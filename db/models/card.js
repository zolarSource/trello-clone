const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },

    items: [{
        value: String
    }]
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;