const express = require('express');
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  listingPhotoUpload
} = require('../controllers/listings');

const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(getListings)
  .post(protect, createListing);

router.route('/:id')
  .get(getListing)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

router.route('/:id/photo')
  .put(protect, listingPhotoUpload);

module.exports = router;
