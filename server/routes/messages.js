const express = require('express');
const {
  getMessages,
  getConversations,
  sendMessage,
  deleteMessage
} = require('../controllers/messages');

const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(protect, getConversations)
  .post(protect, sendMessage);

router.route('/:userId')
  .get(protect, getMessages);

router.route('/:id')
  .delete(protect, deleteMessage);

module.exports = router;
