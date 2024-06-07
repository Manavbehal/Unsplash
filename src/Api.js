// src/api.js
import axios from 'axios';

// Load environment variables
const ACCESS_KEY = 'tQjXSiMi5c5unpx9xb7SrargUnuPGuiIIkhvpSYWiM4';


// Create an axios instance with the base URL and headers
const apiClient = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

// Function to list photos
const listPhotos = ({ page, perPage }) => {
  return apiClient.get('/photos', {
    params: {
      page,
      per_page: perPage,
    },
  });
};

// Export the API methods
export const api = {
  photos: {
    list: listPhotos,
  },
};
