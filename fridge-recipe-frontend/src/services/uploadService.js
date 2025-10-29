import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const uploadAndAnalyze = async (imageFile, onProgress) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const token = localStorage.getItem('token');

  const response = await axios.post(`${API_URL}/upload/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (onProgress) {
        onProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const token = localStorage.getItem('token');

  const response = await axios.post(`${API_URL}/upload/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};