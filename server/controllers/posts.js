const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    let query = {};
    
    // Filter by post type if specified
    if (req.query.postType) {
      query.postType = req.query.postType;
    }
    
    // Filter by user if specified
    if (req.query.user) {
      query.user = req.query.user;
    }
    
    // Search by content if specified
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    const total = await Post.countDocuments(query);
    
    const posts = await Post.find(query)
      .populate({
        path: 'user',
        select: 'username profilePicture'
      })
      .populate({
        path: 'comments.user',
        select: 'username profilePicture'
      })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: posts.length,
      pagination,
      data: posts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'username profilePicture'
      })
      .populate({
        path: 'comments.user',
        select: 'username profilePicture'
      });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;
    
    const post = await Post.create(req.body);
    
    // Populate user details for the response
    const populatedPost = await Post.findById(post._id).populate({
      path: 'user',
      select: 'username profilePicture'
    });
    
    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is post owner
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this post`
      });
    }
    
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate({
      path: 'user',
      select: 'username profilePicture'
    });
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is post owner
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this post`
      });
    }
    
    await post.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
// @access  Private
exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }
    
    // Check if the post has already been liked by this user
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Post already liked'
      });
    }
    
    // Add user id to likes array
    post.likes.unshift(req.user.id);
    await post.save();
    
    // Create notification for post owner
    if (post.user.toString() !== req.user.id) {
      await Notification.create({
        recipient: post.user,
        sender: req.user.id,
        type: 'like',
        content: 'liked your post',
        relatedPost: post._id
      });
    }
    
    res.status(200).json({
      success: true,
      data: post.likes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Unlike a post
// @route   PUT /api/posts/:id/unlike
// @access  Private
exports.unlikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }
    
    // Check if the post has not yet been liked by this user
    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Post has not yet been liked'
      });
    }
    
    // Remove user id from likes array
    post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    await post.save();
    
    res.status(200).json({
      success: true,
      data: post.likes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }
    
    const newComment = {
      user: req.user.id,
      content: req.body.content
    };
    
    // Add to comments array
    post.comments.unshift(newComment);
    await post.save();
    
    // Populate user info for the new comment
    const updatedPost = await Post.findById(post._id)
      .populate({
        path: 'comments.user',
        select: 'username profilePicture'
      });
    
    // Create notification for post owner
    if (post.user.toString() !== req.user.id) {
      await Notification.create({
        recipient: post.user,
        sender: req.user.id,
        type: 'comment',
        content: 'commented on your post',
        relatedPost: post._id
      });
    }
    
    res.status(201).json({
      success: true,
      data: updatedPost.comments
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete comment from post
// @route   DELETE /api/posts/:id/comments/:comment_id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }
    
    // Find the comment
    const comment = post.comments.find(
      comment => comment._id.toString() === req.params.comment_id
    );
    
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment does not exist'
      });
    }
    
    // Check if user is comment owner or post owner or admin
    if (
      comment.user.toString() !== req.user.id &&
      post.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized to delete this comment'
      });
    }
    
    // Remove comment
    post.comments = post.comments.filter(
      comment => comment._id.toString() !== req.params.comment_id
    );
    
    await post.save();
    
    res.status(200).json({
      success: true,
      data: post.comments
    });
  } catch (err) {
    next(err);
  }
};
