const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://alder-quiz:hkh9Gozrh7RqYQpg@alder-cluster.8nx59.mongodb.net/?retryWrites=true&w=majority&appName=Alder-Cluster';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection successful!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
