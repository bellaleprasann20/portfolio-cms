import apiClient from './apiClient';

const skillsApi = {
  list: async () => {
    const response = await apiClient.get('/skills');
    // Assuming backend returns an array of skills, or { items: [...] }
    return response.data.items || response.data; 
  },
};

export default skillsApi;