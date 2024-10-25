// models/Word.js

const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  exampleSentences: { type: [String], default: [] } // Add this field
});

module.exports = mongoose.model('Word', wordSchema);
