
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },

  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },

  role: {
    type: String,
    required: [true, 'Please add a role'],
    enum: ['developer', 'designer', 'engineer', 'manager'],
    lowercase: true
  },

  password: {
    type: String,
    required: [true, 'Please enter a valid password'],
    minlength: [6, 'Password must have at least 6 characters'],
    select: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);