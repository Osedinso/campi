const User = require('../models/User');
const Post = require('../models/Post');
const Listing = require('../models/Listing');
const path = require('path');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Finding resource
    let query = User.find(JSON.parse(queryStr));
    
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    } else {
      // Default fields to return
      query = query.select('username profilePicture bio createdAt');
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments(JSON.parse(queryStr));
    
    query = query.skip(startIndex).limit(limit);
    
    // Executing query
    const users = await query;
    
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
      count: users.length,
      pagination,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload profile picture
// @route   PUT /api/users/profile-picture
// @access  Private
exports.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }
    
    const file = req.files.file;
    
    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }
    
    // Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD || 1000000) {
      return res.status(400).json({
        success: false,
        message: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD || 1000000} bytes`
      });
    }
    
    // Create custom filename
    file.name = `profile_${req.user.id}${path.parse(file.name).ext}`;
    
    file.mv(`${process.env.FILE_UPLOAD_PATH || './uploads/'}${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Problem with file upload'
        });
      }
      
      // Update user with profile picture
      await User.findByIdAndUpdate(req.user.id, { profilePicture: file.name });
      
      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's posts
// @route   GET /api/users/:id/posts
// @access  Public
exports.getUserPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found with id of ${req.params.id}`
      });
    }
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const total = await Post.countDocuments({ user: req.params.id });
    
    const posts = await Post.find({ user: req.params.id })
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

// @desc    Get user's listings
// @route   GET /api/users/:id/listings
// @access  Public
exports.getUserListings = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found with id of ${req.params.id}`
      });
    }
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const total = await Listing.countDocuments({ seller: req.params.id });
    
    const listings = await Listing.find({ seller: req.params.id })
      .populate({
        path: 'seller',
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
      count: listings.length,
      pagination,
      data: listings
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Private
exports.followUser = async (req, res, next) => {
  try {
    // Check if user exists
    const userToFollow = await User.findById(req.params.id);
    
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: `User not found with id of ${req.params.id}`
      });
    }
    
    // Check if user is trying to follow themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot follow yourself'
      });
    }
    
    // Check if user is already following
    const currentUser = await User.findById(req.user.id);
    
    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already following this user'
      });
    }
    
    // Add to following array
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { following: req.params.id } }
    );
    
    // Add to followers array
    await User.findByIdAndUpdate(
      req.params.id,
      { $push: { followers: req.user.id } }
    );
    
    res.status(200).json({
      success: true,
      message: 'User followed successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Private
exports.unfollowUser = async (req, res, next) => {
  try {
    // Check if user exists
    const userToUnfollow = await User.findById(req.params.id);
    
    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        message: `User not found with id of ${req.params.id}`
      });
    }
    
    // Check if user is trying to unfollow themselves
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot unfollow yourself'
      });
    }
    
    // Check if user is actually following
    const currentUser = await User.findById(req.user.id);
    
    if (!currentUser.following.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'You are not following this user'
      });
    }
    
    // Remove from following array
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { following: req.params.id } }
    );
    
    // Remove from followers array
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followers: req.user.id } }
    );
    
    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully'
    });
  } catch (err) {
    next(err);
  }
};
