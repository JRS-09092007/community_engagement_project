const mongoose = require('mongoose');

/**
 * Feedback Schema - User Feedback and Suggestions
 * Stores feedback submitted by users about the platform
 */
const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    type: {
      type: String,
      required: [true, 'Please provide feedback type'],
      enum: ['Suggestion', 'Complaint', 'Appreciation', 'Bug Report', 'General'],
      default: 'General',
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      maxlength: [100, 'Subject cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please provide your message'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    adminResponse: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Resolved', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
