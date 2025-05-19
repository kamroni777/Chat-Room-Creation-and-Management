const express = require('express');
const router = express.Router();
const ChatRoom = require('../models/ChatRoom');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  try {
    const room = new ChatRoom({
      name: req.body.name,
      creator: req.userId
    });
    
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Room name already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const rooms = await ChatRoom.find()
      .populate('creator', 'username avatar')
      .populate('participants', 'username avatar');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/chat-rooms/:id/join
// @desc    Join a chat room
router.post('/:id/join', auth, async (req, res) => {
  try {
    const room = await ChatRoom.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { participants: req.userId } },
      { new: true }
    ).populate('participants', 'username avatar');
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/:id/leave', auth, async (req, res) => {
  try {
    const room = await ChatRoom.findByIdAndUpdate(
      req.params.id,
      { $pull: { participants: req.userId } },
      { new: true }
    );
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;