const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    try {
        let category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        const newCategory = new Category({ name });
        category = await newCategory.save();
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
};