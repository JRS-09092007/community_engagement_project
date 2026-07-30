const { body, param, validationResult } = require('express-validator');

/**
 * Validation Result Handler
 * Checks for validation errors and returns formatted response
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Auth Validators
 */
const registerValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

/**
 * Service Validators
 */
const serviceValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Identity',
      'Health',
      'Education',
      'Finance',
      'Governance',
      'Employment',
      'Travel',
      'Social Welfare',
    ])
    .withMessage('Invalid category'),
  body('websiteUrl')
    .trim()
    .notEmpty()
    .withMessage('Website URL is required')
    .isURL()
    .withMessage('Please provide a valid URL'),
  handleValidationErrors,
];

/**
 * Scheme Validators
 */
const schemeValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
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
    ])
    .withMessage('Invalid category'),
  body('ministry')
    .trim()
    .notEmpty()
    .withMessage('Ministry name is required'),
  body('eligibility')
    .trim()
    .notEmpty()
    .withMessage('Eligibility criteria is required'),
  body('applicationProcess')
    .trim()
    .notEmpty()
    .withMessage('Application process is required'),
  handleValidationErrors,
];

/**
 * Quiz Validators
 */
const quizValidator = [
  body('question')
    .trim()
    .notEmpty()
    .withMessage('Question is required'),
  body('options')
    .isArray({ min: 2, max: 4 })
    .withMessage('Options must be an array of 2-4 items'),
  body('correctAnswer')
    .isInt({ min: 0, max: 3 })
    .withMessage('Correct answer must be a valid option index'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be Easy, Medium, or Hard'),
  handleValidationErrors,
];

/**
 * Feedback Validators
 */
const feedbackValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required'),
  body('type')
    .optional()
    .isIn(['Suggestion', 'Complaint', 'Appreciation', 'Bug Report', 'General'])
    .withMessage('Invalid feedback type'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  handleValidationErrors,
];

module.exports = {
  registerValidator,
  loginValidator,
  serviceValidator,
  schemeValidator,
  quizValidator,
  feedbackValidator,
  handleValidationErrors,
};
