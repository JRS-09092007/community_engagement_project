const express = require('express');
const Feedback = require('../models/Feedback');
const { auth, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { feedbackValidator } = require('../middleware/validator');

const router = express.Router();

/**
 * @route   POST /api/feedback
 * @desc    Submit feedback
 * @access  Public
 */
router.post(
  '/',
  feedbackValidator,
  asyncHandler(async (req, res) => {
    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      feedback,
    });
  })
);

/**
 * @route   GET /api/feedback
 * @desc    Get all feedback (admin only)
 * @access  Admin
 */
router.get(
  '/',
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const { status, type, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Feedback.countDocuments(query);

    res.json({
      success: true,
      count: feedbacks.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      feedbacks,
    });
  })
);

/**
 * @route   GET /api/feedback/stats
 * @desc    Get feedback statistics
 * @access  Admin
 */
router.get(
  '/stats',
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const totalFeedback = await Feedback.countDocuments();
    const unreadFeedback = await Feedback.countDocuments({ isRead: false });
    const averageRating = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    res.json({
      success: true,
      stats: {
        total: totalFeedback,
        unread: unreadFeedback,
        averageRating: averageRating[0]?.avgRating?.toFixed(1) || 0,
      },
    });
  })
);

/**
 * @route   PUT /api/feedback/:id
 * @desc    Update feedback status and add admin response
 * @access  Admin
 */
router.put(
  '/:id',
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const { status, adminResponse } = req.body;
    const updateData = {};

    if (status) updateData.status = status;
    if (adminResponse !== undefined) updateData.adminResponse = adminResponse;
    updateData.isRead = true;

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.json({
      success: true,
      message: 'Feedback updated successfully',
      feedback,
    });
  })
);

/**
 * @route   DELETE /api/feedback/:id
 * @desc    Delete feedback
 * @access  Admin
 */
router.delete(
  '/:id',
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    await feedback.deleteOne();

    res.json({
      success: true,
      message: 'Feedback deleted successfully',
    });
  })
);

module.exports = router;
