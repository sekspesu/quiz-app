// backend/index.js

// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://alderlips.com'], // Replace with your frontend URL
}));

// MongoDB Connection URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');

    // Define your Mongoose models
    const wordSchema = new mongoose.Schema({
      word: { type: String, required: true },
      translation: { type: String, required: true },
    });

    const Word = mongoose.model('Word', wordSchema);

    // Routes

    // Get all words
    app.get('/api/words', async (req, res) => {
      try {
        const words = await Word.find();
        res.json(words);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Add a new word
    app.post('/api/words', async (req, res) => {
      const word = new Word({
        word: req.body.word,
        translation: req.body.translation,
      });

      try {
        const newWord = await word.save();
        res.status(201).json(newWord);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    });

    // Delete a word
    app.delete('/api/words/:id', async (req, res) => {
      try {
        await Word.findByIdAndDelete(req.params.id);
        res.json({ message: 'Word deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

  app.get('/api/test-connection', async (req, res) => {
    try {
      await mongoose.connection.db.admin().ping();
      res.json({ message: 'Database connection is healthy' });
    } catch (err) {
      res.status(500).json({ message: 'Database connection failed', error: err });
    }
  });
  