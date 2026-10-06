/**
 * Formats a standard ISO date string into a readable format.
 * @param {string} dateString - ISO Date string (e.g., '2026-10-03T12:00:00Z')
 * @param {boolean} includeTime - Whether to include the time in the output
 * @returns {string} Formatted date (e.g., 'Oct 3, 2026')
 */
export const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return '';
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Truncates a string to a specific length and adds an ellipsis.
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length before truncating
 * @returns {string} Truncated string
 */
export const truncateText = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Converts a string to a URL-friendly slug.
 * Example: "Real-Time Chat App!" -> "real-time-chat-app"
 * @param {string} text - String to convert
 * @returns {string} URL-safe slug
 */
export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
};

/**
 * Safely extracts a readable error message from Axios error objects.
 * @param {Error} error - Catch block error object
 * @returns {string} Clean error message string
 */
export const parseApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.response && error.response.data && error.response.data.detail) {
    // FastAPI often uses 'detail' for error messages
    return typeof error.response.data.detail === 'string' 
      ? error.response.data.detail 
      : 'Validation Error';
  }
  return error.message || 'An unexpected error occurred. Please try again.';
};