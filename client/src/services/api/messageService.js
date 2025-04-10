import apiClient from './apiClient';

/**
 * Messages API Service
 * Handles all API requests related to messaging
 */
const messageService = {
  /**
   * Get all conversations for the current user
   * @returns {Promise} The API response with conversations
   */
  getConversations: async () => {
    const response = await apiClient.get('/messages');
    return response.data;
  },

  /**
   * Get messages between the current user and another user
   * @param {string} userId - The ID of the other user
   * @returns {Promise} The API response with messages
   */
  getMessages: async (userId) => {
    const response = await apiClient.get(`/messages/${userId}`);
    return response.data;
  },

  /**
   * Send a message to another user
   * @param {Object} messageData - The message data including recipient and content
   * @returns {Promise} The API response
   */
  sendMessage: async (messageData) => {
    const response = await apiClient.post('/messages', messageData);
    return response.data;
  },

  /**
   * Delete a message
   * @param {string} messageId - The message ID to delete
   * @returns {Promise} The API response
   */
  deleteMessage: async (messageId) => {
    const response = await apiClient.delete(`/messages/${messageId}`);
    return response.data;
  }
};

export default messageService;
