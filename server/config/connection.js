const mongoose = require('mongoose');

const connectDB = mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chathub');

module.exports = connectDB;