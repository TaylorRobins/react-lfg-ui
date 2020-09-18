import axios from "axios";

const BASE_URL = "https://taylorlfg-api.herokuapp.com";

const getPosts = () => {
  return axios.get(`${BASE_URL}/api/posts`);
};

const getPost = (postId) => {
  return axios.get(`${BASE_URL}/api/posts/${postId}`);
};

const createPost = (post) => {
  return axios.post(`${BASE_URL}/api/posts`, post);
};

const updatePost = (postId, post) => {
  return axios.put(`${BASE_URL}/api/posts/${postId}`, post);
};

const deletePost = (postId) => {
  return axios.delete(`${BASE_URL}/api/posts/${postId}`);
};
export { getPosts, getPost, createPost, updatePost, deletePost };
