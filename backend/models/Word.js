// backend/models/Word.js
const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Word', WordSchema);
