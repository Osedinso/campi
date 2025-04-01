const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment
} = require('../controllers/posts');

const { protect } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like')
  .put(protect, likePost);

router.route('/:id/unlike')
  .put(protect, unlikePost);

router.route('/:id/comments')
  .post(protect, addComment);

router.route('/:id/comments/:comment_id')
  .delete(protect, deleteComment);

module.exports = router;
