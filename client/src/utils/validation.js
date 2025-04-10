/**
 * Validation utility functions for form inputs
 */

/**
 * Validate email format
 * @param {string} email - Email string to validate
 * @returns {boolean} - Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Requires at least 8 characters, one uppercase, one lowercase, and one number
 * @param {string} password - Password string to validate
 * @returns {boolean} - Whether password meets strength requirements
 */
export const isStrongPassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
};

/**
 * Get password strength score (0-4)
 * @param {string} password - Password string to evaluate
 * @returns {number} - Score from 0 (very weak) to 4 (very strong)
 */
export const getPasswordStrength = (password) => {
  if (!password) return 0;
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Normalize score to 0-4 range
  return Math.min(4, Math.floor(score / 1.5));
};

/**
 * Get password strength feedback
 * @param {number} strength - Password strength score (0-4)
 * @returns {Object} - Feedback object with message and color properties
 */
export const getPasswordFeedback = (strength) => {
  switch (strength) {
    case 0:
      return { message: 'Very weak', color: '#f44336' };
    case 1:
      return { message: 'Weak', color: '#ff9800' };
    case 2:
      return { message: 'Medium', color: '#ffeb3b' };
    case 3:
      return { message: 'Strong', color: '#4caf50' };
    case 4:
      return { message: 'Very strong', color: '#2e7d32' };
    default:
      return { message: '', color: '#ccc' };
  }
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether phone number is valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

/**
 * Format price as currency
 * @param {number|string} price - Price to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted price
 */
export const formatPrice = (price, currency = 'USD') => {
  if (!price) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Format date
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
};

/**
 * Format relative time (e.g. "2 hours ago", "just now")
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted relative time
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(date);
  }
};

export default {
  isValidEmail,
  isStrongPassword,
  getPasswordStrength,
  getPasswordFeedback,
  isValidPhone,
  formatPrice,
  isValidUrl,
  truncateText,
  formatDate,
  formatRelativeTime
};
