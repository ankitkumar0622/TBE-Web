const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/tbe';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

testConnection();
