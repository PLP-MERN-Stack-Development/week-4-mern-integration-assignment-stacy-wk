const Post = require('../models/Post');
const { validationResult } = require('express-validator'); // For validation

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('category', 'name').sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        next(err); 
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('category', 'name');
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        next(err);
    }
};

exports.createPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category } = req.body;
    try {
        const newPost = new Post({
            title,
            content,
            category,
        });
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};

exports.updatePost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, category } = req.body;
    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.category = category || post.category;

        await post.save();
        res.json(post);
    } catch (err) {
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }


        await Post.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Post removed' });
    } catch (err) {
        next(err);
    }
};