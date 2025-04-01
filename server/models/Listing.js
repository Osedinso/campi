const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['Food', 'Electronics', 'Books', 'Clothing', 'Services', 'Miscellaneous']
  },
  images: [{
    type: String
  }],
  location: {
    type: String,
    required: [true, 'Please provide a pickup/meeting location']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFoodItem: {
    type: Boolean,
    default: false
  },
  // Additional fields for food items
  foodDetails: {
    availableTime: {
      type: Date
    },
    expiryTime: {
      type: Date
    },
    ingredients: {
      type: String
    },
    dietary: {
      type: [String],
      enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'None']
    }
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
ListingSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'listing',
  justOne: false
});

module.exports = mongoose.model('Listing', ListingSchema);
