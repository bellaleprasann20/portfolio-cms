import apiClient from './apiClient';

const servicesApi = {
  list: async () => {
    const response = await apiClient.get('/services');
    return response.data.items || response.data;
  },
};

export default servicesApi;