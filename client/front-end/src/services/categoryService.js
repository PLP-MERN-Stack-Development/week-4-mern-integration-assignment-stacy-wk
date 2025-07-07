import axios from 'axios';

const API_URL = '/api/posts'; 

const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const getPostById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

const createPost = async (postData) => {
    const response = await axios.post(API_URL, postData);
    return response.data;
};

const updatePost = async (id, postData) => {
    const response = await axios.put(`${API_URL}/${id}`, postData);
    return response.data;
};

const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export default {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};