import apiClient from './apiClient';

/**
 * Notifications API Service
 * Handles all API requests related to user notifications
 */
const notificationService = {
  /**
   * Get all notifications for the current user
   * @returns {Promise} The API response with notifications
   */
  getNotifications: async () => {
    const response = await apiClient.get('/notifications');
    return response.data;
  },

  /**
   * Mark a notification as read
   * @param {string} id - The notification ID
   * @returns {Promise} The API response
   */
  markAsRead: async (id) => {
    const response = await apiClient.put(`/notifications/${id}/read`);
    return response.data;
  },

  /**
   * Mark all notifications as read
   * @returns {Promise} The API response
   */
  markAllAsRead: async () => {
    const response = await apiClient.put('/notifications/read-all');
    return response.data;
  },

  /**
   * Delete a notification
   * @param {string} id - The notification ID
   * @returns {Promise} The API response
   */
  deleteNotification: async (id) => {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  },

  /**
   * Delete all notifications
   * @returns {Promise} The API response
   */
  deleteAllNotifications: async () => {
    const response = await apiClient.delete('/notifications');
    return response.data;
  }
};

export default notificationService;
