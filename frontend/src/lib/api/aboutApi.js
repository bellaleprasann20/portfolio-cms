import apiClient from './apiClient';

const aboutApi = {
  get: async () => {
    const response = await apiClient.get('/about');
    return response.data;
  },
};

export default aboutApi;