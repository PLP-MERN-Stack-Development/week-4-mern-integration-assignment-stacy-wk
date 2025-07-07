console.log('--- Debug: Start of index.js ---');

// Import required modules
const express = require('express');
console.log('--- Debug: express required ---');
const mongoose = require('mongoose');
console.log('--- Debug: mongoose required ---');
const cors = require('cors');
console.log('--- Debug: cors required ---');
const dotenv = require('dotenv');
console.log('--- Debug: dotenv required ---');
const path = require('path');
console.log('--- Debug: path required ---');

// Import routes
const postRoutes = require('./routes/posts');
console.log('--- Debug: postRoutes required ---');
const categoryRoutes = require('./routes/categories');
console.log('--- Debug: categoryRoutes required ---');
const authRoutes = require('./routes/auth');
console.log('--- Debug: authRoutes required ---');

// Load environment variables
dotenv.config();
console.log('--- Debug: dotenv config loaded ---');
console.log('--- Debug: MONGO_URI:', process.env.MONGODB_URI); 

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
console.log('--- Debug: Express app initialized ---');


// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);

  });


process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

module.exports = app;
