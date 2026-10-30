const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Please add a post title'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },

    content: {
    type: String,
    required: [true, 'Please add post content']
  },

  // Reference to the User model (Relational link)
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Post', PostSchema);