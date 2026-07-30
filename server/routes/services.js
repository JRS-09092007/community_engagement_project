const express = require('express');
const Service = require('../models/Service');
const { auth, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { serviceValidator } = require('../middleware/validator');

const router = express.Router();

/**
 * @route   GET /api/services
 * @desc    Get all services with optional filtering
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

    const services = await Service.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      count: services.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      services,
    });
  })
);

/**
 * @route   GET /api/services/categories
 * @desc    Get all service categories
 * @access  Public
 */
router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = [
      'All',
      'Identity',
      'Health',
      'Education',
      'Finance',
      'Governance',
      'Employment',
      'Travel',
      'Social Welfare',
    ];
    res.json({
      success: true,
      categories,
    });
  })
);

/**
 * @route   GET /api/services/:id
 * @desc    Get single service by ID
 * @access  Public
 */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id).populate(
      'createdBy',
      'name'
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Increment view count
    service.views += 1;
    await service.save();

    res.json({
      success: true,
      service,
    });
  })
);

/**
 * @route   POST /api/services
 * @desc    Create a new service
 * @access  Admin
 */
router.post(
  '/',
  auth,
  admin,
  serviceValidator,
  asyncHandler(async (req, res) => {
    const service = await Service.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service,
    });
  })
);

/**
 * @route   PUT /api/services/:id
 * @desc    Update a service
 * @access  Admin
 */
router.put(
  '/:id',
  auth,
  admin,
  serviceValidator,
  asyncHandler(async (req, res) => {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: 'Service updated successfully',
      service,
    });
  })
);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete a service
 * @access  Admin
 */
router.delete(
  '/:id',
  auth,
  admin,
  asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    // Soft delete by setting isActive to false
    service.isActive = false;
    await service.save();

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  })
);

/**
 * @route   GET /api/services/stats/overview
 * @desc    Get service statistics
 * @access  Public
 */
router.get(
  '/stats/overview',
  asyncHandler(async (req, res) => {
    const totalServices = await Service.countDocuments({ isActive: true });
    const categories = await Service.distinct('category', { isActive: true });

    res.json({
      success: true,
      totalServices,
      categoryCount: categories.length,
    });
  })
);

module.exports = router;
