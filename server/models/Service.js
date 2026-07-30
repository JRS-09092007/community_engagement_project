const mongoose = require('mongoose');

/**
 * Service Schema - Digital Government Services
 * Stores information about digital services like DigiLocker, UMANG, etc.
 */
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a service title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Identity',
        'Health',
        'Education',
        'Finance',
        'Governance',
        'Employment',
        'Travel',
        'Social Welfare',
      ],
    },
    icon: {
      type: String,
      default: 'Globe',
    },
    websiteUrl: {
      type: String,
      required: [true, 'Please provide the website URL'],
    },
    appUrl: {
      type: String,
      default: '',
    },
    features: [
      {
        type: String,
        maxlength: [200, 'Feature cannot exceed 200 characters'],
      },
    ],
    eligibility: {
      type: String,
      default: 'All Indian citizens',
    },
    documents: [
      {
        type: String,
      },
    ],
    steps: [
      {
        title: String,
        description: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
serviceSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Service', serviceSchema);
