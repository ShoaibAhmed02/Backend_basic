// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName:String,
  email:String,
  role:String,
  password: String,
  token:String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
