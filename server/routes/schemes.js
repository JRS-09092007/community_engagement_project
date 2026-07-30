const express = require('express');
const Scheme = require('../models/Scheme');
const { auth, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { schemeValidator } = require('../middleware/validator');

const router = express.Router();

/**
 * @route   GET /api/schemes
 * @desc    Get all schemes with optional filtering
 * @access  Public
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, search, page = 1, limit = 12 } = req.query;
    const query = { isActive: true };

    // Filter by category
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const schemes = await Scheme.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Scheme.countDocuments(query);

    res.json({
      success: true,
      count: schemes.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      schemes,
    });
  })
);

/**
 * @route   GET /api/schemes/categories
 * @desc    Get all scheme categories
 * @access  Public
 */
router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = [
      'All',
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
    ];
    res.json({
      success: true,
      categories,
    });
  })
);

/**
 * @route   GET /api/schemes/:id
 * @desc    Get single scheme by ID
 * @access  Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const scheme = await Scheme.findById(req.params.id).populate(
      'createdBy',
      'name'
    );

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found',
      });
    }

    // Increment view count
    scheme.views += 1;
    await scheme.save();

    res.json({
      success: true,
      scheme,
    });
  })
);

/**
 * @route   POST /api/schemes
 * @desc    Create a new scheme
 * @access  Admin
 */
router.post(
  '/',
  auth,
  admin,
  schemeValidator,
  asyncHandler(async (req, res) => {
    const scheme = await Scheme.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Scheme created successfully',
      scheme,
    });
  })
);

/**
 * @route   PUT /api/schemes/:id
 * @desc    Update a scheme
 * @access  Admin
 */
router.put(
  '/:id',
  auth,
  admin,
  schemeValidator,
  asyncHandler(async (req, res) => {
    let scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found',
      });
    }

    scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: 'Scheme updated successfully',
      scheme,
    });
  })
);

/**
 * @route   DELETE /api/schemes/:id
 * @desc    Delete a scheme
 * @access  Admin
 */
router.delete(
  '/:id',
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: 'Scheme not found',
      });
    }

    // Soft delete
    scheme.isActive = false;
    await scheme.save();

    res.json({
      success: true,
      message: 'Scheme deleted successfully',
    });
  })
);

/**
 * @route   GET /api/schemes/stats/overview
 * @desc    Get scheme statistics
 * @access  Public
 */
router.get(
  '/stats/overview',
  asyncHandler(async (req, res) => {
    const totalSchemes = await Scheme.countDocuments({ isActive: true });
    const categories = await Scheme.distinct('category', { isActive: true });

    res.json({
      success: true,
      totalSchemes,
      categoryCount: categories.length,
    });
  })
);

module.exports = router;
