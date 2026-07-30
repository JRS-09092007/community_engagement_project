const mongoose = require('mongoose');

/**
 * Quiz Schema - Quiz Questions for Digital Literacy
 * Stores multiple choice questions to test citizen awareness
 */
const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Please provide a question'],
      maxlength: [500, 'Question cannot exceed 500 characters'],
    },
    options: [
      {
        type: String,
        required: [true, 'Please provide options'],
        maxlength: [200, 'Option cannot exceed 200 characters'],
      },
    ],
    correctAnswer: {
      type: Number,
      required: [true, 'Please provide the correct answer index'],
      min: 0,
      max: 3,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Digital Services',
        'Welfare Schemes',
        'Health',
        'Education',
        'Finance',
        'Governance',
        'General Knowledge',
      ],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    explanation: {
      type: String,
      maxlength: [500, 'Explanation cannot exceed 500 characters'],
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model('Quiz', quizSchema);
