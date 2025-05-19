const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [30, 'Room name cannot exceed 30 characters']
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


ChatRoomSchema.index({ name: 1, creator: 1 });

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);