import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import postService from '../services/postService';
import categoryService from '../services/categoryService'; // To fetch categories

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();

        if (id) {
            const fetchPost = async () => {
                try {
                    const data = await postService.getPostById(id);
                    setTitle(data.title);
                    setContent(data.content);
                    setCategory(data.category?._id || ''); // Handle case where category might not be populated
                } catch (err) {
                    console.error('Error fetching post:', err);
                }
            };
            fetchPost();
        }
    }, [id]);

    const validateForm = () => {
        let newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!content.trim()) newErrors.content = 'Content is required';
        if (!category) newErrors.category = 'Category is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const postData = { title, content, category };
        try {
            if (id) {
                await postService.updatePost(id, postData);
            } else {
                await postService.createPost(postData);
            }
            navigate('/'); // Redirect to post list
        } catch (err) {
            console.error('Error saving post:', err);
            setErrors({ api: err.response?.data?.msg || 'Failed to save post' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                        id="content"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
                {errors.api && <div className="alert alert-danger">{errors.api}</div>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
                </button>
            </form>
        </div>
    );
};

export default PostForm;