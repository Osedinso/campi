const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Please provide message content'],
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  relatedListing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create compound index for efficient message retrieval
MessageSchema.index({ sender: 1, recipient: 1 });

module.exports = mongoose.model('Message', MessageSchema);
