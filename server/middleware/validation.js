const { check } = require('express-validator');

exports.validatePost = [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category', 'Category must be a valid ID').isMongoId().optional(), // If category is optional
];

exports.validateCategory = [
    check('name', 'Category name is required').not().isEmpty(),
    check('name', 'Category name must be at least 3 characters').isLength({ min: 3 }),
];