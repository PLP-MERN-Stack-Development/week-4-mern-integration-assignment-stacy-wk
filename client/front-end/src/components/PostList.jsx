import React, { useEffect, useState } from 'react';
import postService from '../services/postService';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await postService.getPosts();
                setPosts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await postService.deletePost(id);
                setPosts(posts.filter((post) => post._id !== id));
            } catch (err) {
                console.error('Error deleting post:', err);
                // Handle error in UI
            }
        }
    };

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container">
            <h1>Blog Posts</h1>
            <Link to="/posts/new" className="btn btn-primary mb-3">
                Create New Post
            </Link>
            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <div className="row">
                    {posts.map((post) => (
                        <div className="col-md-4 mb-4" key={post._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">
                                        {post.content.substring(0, 100)}...
                                    </p>
                                    <Link to={`/posts/${post._id}`} className="btn btn-info btn-sm me-2">
                                        View
                                    </Link>
                                    <Link to={`/posts/edit/${post._id}`} className="btn btn-warning btn-sm me-2">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;