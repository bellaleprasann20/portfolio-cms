import apiClient from './apiClient';

const contactApi = {
  submit: async (formData) => {
    // formData should contain: name, email, subject, message
    const response = await apiClient.post('/contact', formData);
    return response.data;
  },
};

export default contactApi;