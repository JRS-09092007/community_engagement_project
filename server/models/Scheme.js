const mongoose = require('mongoose');

/**
 * Scheme Schema - Government Welfare Schemes
 * Stores information about welfare schemes for various categories
 */
const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a scheme title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please provide a short description'],
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Student',
        'Women',
        'Farmer',
        'Health',
        'Labour',
        'Senior Citizen',
        'Youth',
        'Startup',
        'Housing',
        'Financial Inclusion',
      ],
    },
    ministry: {
      type: String,
      required: [true, 'Please provide the ministry name'],
    },
    launchedDate: {
      type: Date,
    },
    icon: {
      type: String,
      default: 'Shield',
    },
    benefits: [
      {
        type: String,
        maxlength: [300, 'Benefit cannot exceed 300 characters'],
      },
    ],
    eligibility: {
      type: String,
      required: [true, 'Please provide eligibility criteria'],
    },
    documents: [
      {
        type: String,
      },
    ],
    applicationProcess: {
      type: String,
      required: [true, 'Please provide application process'],
    },
    applicationUrl: {
      type: String,
      default: '',
    },
    helpline: {
      type: String,
      default: '',
    },
    budget: {
      type: String,
      default: '',
    },
    beneficiaries: {
      type: String,
      default: '',
    },
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
schemeSchema.index({ title: 'text', description: 'text', category: 'text', ministry: 'text' });

module.exports = mongoose.model('Scheme', schemeSchema);
