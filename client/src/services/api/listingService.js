import apiClient from './apiClient';

/**
 * Listings API Service
 * Handles all API requests related to marketplace listings
 */
const listingService = {
  /**
   * Get all listings with optional filtering
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise} The API response with listings
   */
  getListings: async (params = {}) => {
    const response = await apiClient.get('/listings', { params });
    return response.data;
  },

  /**
   * Get a specific listing by ID
   * @param {string} id - The listing ID
   * @returns {Promise} The API response with listing details
   */
  getListing: async (id) => {
    const response = await apiClient.get(`/listings/${id}`);
    return response.data;
  },

  /**
   * Create a new listing
   * @param {Object} listingData - The listing data
   * @returns {Promise} The API response
   */
  createListing: async (listingData) => {
    const response = await apiClient.post('/listings', listingData);
    return response.data;
  },

  /**
   * Update a listing
   * @param {string} id - The listing ID
   * @param {Object} listingData - Updated listing data
   * @returns {Promise} The API response
   */
  updateListing: async (id, listingData) => {
    const response = await apiClient.put(`/listings/${id}`, listingData);
    return response.data;
  },

  /**
   * Delete a listing
   * @param {string} id - The listing ID
   * @returns {Promise} The API response
   */
  deleteListing: async (id) => {
    const response = await apiClient.delete(`/listings/${id}`);
    return response.data;
  },

  /**
   * Upload a photo for a listing
   * @param {string} id - The listing ID
   * @param {FormData} formData - Form data with the photo file
   * @returns {Promise} The API response
   */
  uploadListingPhoto: async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const response = await apiClient.put(`/listings/${id}/photo`, formData, config);
    return response.data;
  }
};

export default listingService;
