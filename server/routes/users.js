const express = require('express');
const {
  getUsers,
  getUser,
  uploadProfilePicture,
  getUserPosts,
  getUserListings,
  followUser,
  unfollowUser
} = require('../controllers/users');

const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(getUsers);

router.route('/profile-picture')
  .put(protect, uploadProfilePicture);

router.route('/:id')
  .get(getUser);

router.route('/:id/posts')
  .get(getUserPosts);

router.route('/:id/listings')
  .get(getUserListings);

router.route('/:id/follow')
  .put(protect, followUser);

router.route('/:id/unfollow')
  .put(protect, unfollowUser);

module.exports = router;
