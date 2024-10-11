// backend/importWords.js
const mongoose = require('mongoose');
const Word = require('./models/Word');
const fs = require('fs');

// MongoDB Connection URI
const mongoURI = 'mongodb://localhost:27017/vocabulary_app'; // Replace with your connection string

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Read the JSON file
    fs.readFile('words.json', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      try {
        const words = JSON.parse(data);
        await Word.insertMany(words);
        console.log('Words imported successfully');
        process.exit(0);
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });
  })
  .catch(err => console.log(err));
