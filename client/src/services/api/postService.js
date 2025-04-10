import apiClient from './apiClient';

/**
 * Posts API Service
 * Handles all API requests related to social feed posts
 */
const postService = {
  /**
   * Get all posts with pagination
   * @param {Object} params - Query parameters for pagination
   * @returns {Promise} The API response with posts
   */
  getPosts: async (params = {}) => {
    const response = await apiClient.get('/posts', { params });
    return response.data;
  },

  /**
   * Get a specific post by ID
   * @param {string} id - The post ID
   * @returns {Promise} The API response with post details
   */
  getPost: async (id) => {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  },

  /**
   * Create a new post
   * @param {Object} postData - The post data
   * @returns {Promise} The API response
   */
  createPost: async (postData) => {
    const response = await apiClient.post('/posts', postData);
    return response.data;
  },

  /**
   * Update a post
   * @param {string} id - The post ID
   * @param {Object} postData - Updated post data
   * @returns {Promise} The API response
   */
  updatePost: async (id, postData) => {
    const response = await apiClient.put(`/posts/${id}`, postData);
    return response.data;
  },

  /**
   * Delete a post
   * @param {string} id - The post ID
   * @returns {Promise} The API response
   */
  deletePost: async (id) => {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  },

  /**
   * Like a post
   * @param {string} id - The post ID
   * @returns {Promise} The API response
   */
  likePost: async (id) => {
    const response = await apiClient.put(`/posts/${id}/like`);
    return response.data;
  },

  /**
   * Unlike a post
   * @param {string} id - The post ID
   * @returns {Promise} The API response
   */
  unlikePost: async (id) => {
    const response = await apiClient.put(`/posts/${id}/unlike`);
    return response.data;
  },

  /**
   * Add a comment to a post
   * @param {string} id - The post ID
   * @param {Object} commentData - The comment data
   * @returns {Promise} The API response
   */
  addComment: async (id, commentData) => {
    const response = await apiClient.post(`/posts/${id}/comments`, commentData);
    return response.data;
  },

  /**
   * Delete a comment from a post
   * @param {string} postId - The post ID
   * @param {string} commentId - The comment ID
   * @returns {Promise} The API response
   */
  deleteComment: async (postId, commentId) => {
    const response = await apiClient.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
  }
};

export default postService;
