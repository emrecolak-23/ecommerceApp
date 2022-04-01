// Import Packages
const express = require('express');

// Import Controller
const Category = require('../controllers/CategoryController');

// Validate Middleware
const validate = require("../middlewares/validate");
// Validations
const schemas = require("../validations/Category");
// Declare Router
const router = express.Router();

// Routes
router.route('/').get(Category.getAllCategory);
router.route('/:id').patch(validate(schemas.createValidation),Category.updateCategory);
router.route('/:id').delete(Category.deleteCategory);
router.route('/:id').get(Category.getCategoryById);
// Export Router
module.exports = router