const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;