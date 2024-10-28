const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  synonyms: { type: [String], default: [] }, // Add this field
  exampleSentences: { type: [String], default: [] }
});

module.exports = mongoose.model('Word', wordSchema);
