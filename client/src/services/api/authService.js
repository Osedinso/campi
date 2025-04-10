import apiClient from './apiClient';

/**
 * Authentication API Service
 * Handles all API requests related to authentication
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} The API response
   */
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Log in a user
   * @param {Object} credentials - User login credentials
   * @returns {Promise} The API response with token
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * Log out the current user
   * @returns {Promise} The API response
   */
  logout: async () => {
    localStorage.removeItem('token');
    const response = await apiClient.get('/auth/logout');
    return response.data;
  },

  /**
   * Get the current user's data
   * @returns {Promise} The API response with user data
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * Update user details
   * @param {Object} userData - Updated user details
   * @returns {Promise} The API response
   */
  updateDetails: async (userData) => {
    const response = await apiClient.put('/auth/updatedetails', userData);
    return response.data;
  },

  /**
   * Update user password
   * @param {Object} passwordData - Current and new password
   * @returns {Promise} The API response
   */
  updatePassword: async (passwordData) => {
    const response = await apiClient.put('/auth/updatepassword', passwordData);
    return response.data;
  },

  /**
   * Verify email address with token
   * @param {string} token - Email verification token
   * @returns {Promise} The API response
   */
  verifyEmail: async (token) => {
    const response = await apiClient.get(`/auth/verify-email/${token}`);
    return response.data;
  }
};

export default authService;
