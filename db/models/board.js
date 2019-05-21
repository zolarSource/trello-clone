const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
    }
});

const Board = mongoose.model('Boards', boardSchema);

module.exports = Board;