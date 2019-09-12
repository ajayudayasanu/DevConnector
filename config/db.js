const mongoose = require('mongoose');
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const db = config.get('mongoURI');
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
