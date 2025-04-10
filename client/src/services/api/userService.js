import apiClient from './apiClient';

/**
 * Users API Service
 * Handles all API requests related to user profiles and actions
 */
const userService = {
  /**
   * Get all users (with optional filtering)
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise} The API response with users
   */
  getUsers: async (params = {}) => {
    const response = await apiClient.get('/users', { params });
    return response.data;
  },

  /**
   * Get a specific user by ID
   * @param {string} id - The user ID
   * @returns {Promise} The API response with user details
   */
  getUser: async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Upload a profile picture
   * @param {FormData} formData - Form data with the profile picture
   * @returns {Promise} The API response
   */
  uploadProfilePicture: async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await apiClient.put('/users/profile-picture', formData, config);
    return response.data;
  },

  /**
   * Get a user's posts
   * @param {string} id - The user ID
   * @returns {Promise} The API response with user's posts
   */
  getUserPosts: async (id) => {
    const response = await apiClient.get(`/users/${id}/posts`);
    return response.data;
  },

  /**
   * Get a user's listings
   * @param {string} id - The user ID
   * @returns {Promise} The API response with user's listings
   */
  getUserListings: async (id) => {
    const response = await apiClient.get(`/users/${id}/listings`);
    return response.data;
  },

  /**
   * Follow another user
   * @param {string} id - The user ID to follow
   * @returns {Promise} The API response
   */
  followUser: async (id) => {
    const response = await apiClient.put(`/users/${id}/follow`);
    return response.data;
  },

  /**
   * Unfollow a user
   * @param {string} id - The user ID to unfollow
   * @returns {Promise} The API response
   */
  unfollowUser: async (id) => {
    const response = await apiClient.put(`/users/${id}/unfollow`);
    return response.data;
  }
};

export default userService;
