const express = require('express');
const Quiz = require('../models/Quiz');
const { auth, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { quizValidator } = require('../middleware/validator');

const router = express.Router();

/**
 * @route   GET /api/quiz
 * @desc    Get quiz questions with optional filtering
 * @access  Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, difficulty, limit = 10 } = req.query;
    const query = { isActive: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    const limitNum = parseInt(limit, 10);

    // Get random questions
    const questions = await Quiz.aggregate([
      { $match: query },
      { $sample: { size: limitNum } },
      {
        $project: {
          question: 1,
          options: 1,
          category: 1,
          difficulty: 1,
          explanation: 1,
          // Don't send correct answer for quiz mode
          correctAnswer: 1,
        },
      },
    ]);

    res.json({
      success: true,
      count: questions.length,
      questions,
    });
  })
);

/**
 * @route   GET /api/quiz/categories
 * @desc    Get all quiz categories
 * @access  Public
 */
router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = [
      'All',
      'Digital Services',
      'Welfare Schemes',
      'Health',
      'Education',
      'Finance',
      'Governance',
      'General Knowledge',
    ];
    res.json({
      success: true,
      categories,
    });
  })
);

/**
 * @route   POST /api/quiz/validate
 * @desc    Validate quiz answers
 * @access  Public
 */
router.post(
  '/validate',
  asyncHandler(async (req, res) => {
    const { answers } = req.body; // Array of { questionId, selectedAnswer }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide answers to validate',
      });
    }

    const results = [];
    let correctCount = 0;

    for (const answer of answers) {
      const question = await Quiz.findById(answer.questionId);

      if (!question) {
        results.push({
          questionId: answer.questionId,
          correct: false,
          message: 'Question not found',
        });
        continue;
      }

      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correctCount++;

      results.push({
        questionId: answer.questionId,
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      });
    }

    const score = Math.round((correctCount / answers.length) * 100);

    res.json({
      success: true,
      score,
      totalQuestions: answers.length,
      correctAnswers: correctCount,
      results,
    });
  })
);

/**
 * @route   POST /api/quiz
 * @desc    Create a new quiz question
 * @access  Admin
 */
router.post(
  '/',
  auth,
  admin,
  quizValidator,
  asyncHandler(async (req, res) => {
    const quiz = await Quiz.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Quiz question created successfully',
      quiz,
    });
  })
);

/**
 * @route   PUT /api/quiz/:id
 * @desc    Update a quiz question
 * @access  Admin
 */
router.put(
  '/:id',
  auth,
  admin,
  quizValidator,
  asyncHandler(async (req, res) => {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz question not found',
      });
    }

    quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: 'Quiz question updated successfully',
      quiz,
    });
  })
);

/**
 * @route   DELETE /api/quiz/:id
 * @desc    Delete a quiz question
 * @access  Admin
 */
router.delete(
  '/:id',
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz question not found',
      });
    }

    quiz.isActive = false;
    await quiz.save();

    res.json({
      success: true,
      message: 'Quiz question deleted successfully',
    });
  })
);

module.exports = router;
