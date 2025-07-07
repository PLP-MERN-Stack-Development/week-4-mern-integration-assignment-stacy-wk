const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');
const { validatePost } = require('../middleware/validation'); // For validation

router.route('/').get(getPosts).post(validatePost, createPost);
router.route('/:id').get(getPostById).put(validatePost, updatePost).delete(deletePost);

module.exports = router;