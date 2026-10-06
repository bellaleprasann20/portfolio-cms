import apiClient from './apiClient';

const blogsApi = {
  // Only fetch published blogs for the public frontend
  list: async (params = { status: 'Published' }) => {
    const response = await apiClient.get('/blogs', { params });
    return response.data.items || response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  },
};

export default blogsApi;