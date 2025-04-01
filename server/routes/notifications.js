const express = require('express');
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} = require('../controllers/notifications');

const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(protect, getNotifications)
  .delete(protect, deleteAllNotifications);

router.route('/read-all')
  .put(protect, markAllAsRead);

router.route('/:id')
  .delete(protect, deleteNotification);

router.route('/:id/read')
  .put(protect, markAsRead);

module.exports = router;
