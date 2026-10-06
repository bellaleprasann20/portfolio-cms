import apiClient from './apiClient';

const experienceApi = {
  list: async () => {
    const response = await apiClient.get('/experience');
    // Best practice: sort by date descending on the backend, but we just return data here
    return response.data.items || response.data;
  },
};

export default experienceApi;