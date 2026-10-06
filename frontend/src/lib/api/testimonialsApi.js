import apiClient from './apiClient';

const testimonialsApi = {
  list: async () => {
    const response = await apiClient.get('/testimonials');
    return response.data.items || response.data;
  },
};

export default testimonialsApi;