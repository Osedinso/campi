const path = require('path');
const Listing = require('../models/Listing');

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
exports.getListings = async (req, res, next) => {
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
    let query = Listing.find(JSON.parse(queryStr)).populate({
      path: 'seller',
      select: 'username profilePicture'
    });
    
    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
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
    const total = await Listing.countDocuments(JSON.parse(queryStr));
    
    query = query.skip(startIndex).limit(limit);
    
    // Executing query
    const listings = await query;
    
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

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
exports.getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate({
      path: 'seller',
      select: 'username profilePicture'
    });
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: `Listing not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: listing
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
exports.createListing = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.seller = req.user.id;
    
    // Check if listing is food item
    if (req.body.category === 'Food') {
      req.body.isFoodItem = true;
    }
    
    const listing = await Listing.create(req.body);
    
    res.status(201).json({
      success: true,
      data: listing
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private
exports.updateListing = async (req, res, next) => {
  try {
    let listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: `Listing not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is listing owner
    if (listing.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this listing`
      });
    }
    
    // Check if listing is food item
    if (req.body.category === 'Food') {
      req.body.isFoodItem = true;
    }
    
    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: listing
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
exports.deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: `Listing not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is listing owner
    if (listing.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this listing`
      });
    }
    
    await listing.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload photo for listing
// @route   PUT /api/listings/:id/photo
// @access  Private
exports.listingPhotoUpload = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: `Listing not found with id of ${req.params.id}`
      });
    }
    
    // Make sure user is listing owner
    if (listing.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this listing`
      });
    }
    
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
    file.name = `photo_${listing._id}${path.parse(file.name).ext}`;
    
    file.mv(`${process.env.FILE_UPLOAD_PATH || './uploads/'}${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Problem with file upload'
        });
      }
      
      // Update listing with image
      listing.images.push(file.name);
      await listing.save();
      
      res.status(200).json({
        success: true,
        data: file.name
      });
    });
  } catch (err) {
    next(err);
  }
};
