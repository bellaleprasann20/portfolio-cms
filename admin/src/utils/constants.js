// Base API URL injected from Vite environment variables (fallback to localhost for local dev)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Authentication keys
export const AUTH_TOKEN_KEY = 'cms_access_token';
export const AUTH_USER_KEY = 'cms_user_data';

// Standardized categories for dropdowns across forms
export const CATEGORIES = {
  SKILLS: [
    'Languages',
    'Frontend',
    'Backend',
    'Database',
    'AI / ML',
    'Integrations & Tools'
  ],
  EXPERIENCE_TYPES: [
    'Work',
    'Education',
    'Training'
  ],
  BLOG_STATUS: [
    'Draft',
    'Published'
  ]
};

// UI Constants
export const UI = {
  TOAST_DURATION: 3000,
  DEFAULT_PAGE_SIZE: 10
};