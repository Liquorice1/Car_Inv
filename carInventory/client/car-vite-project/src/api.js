// api.js
import axios from 'axios';

const baseURL = 'http://localhost:5000/api/cars';
const api = axios.create({
  baseURL,
});

export default {
  // API functions
  getCars: () => api.get('/'),
  addCar: (carData) => api.post('/', carData),
  getCarById: (id) => api.get(`/${id}`),
  updateCar: (id, carData) => api.put(`/${id}`, carData),
  deleteCar: (id) => api.delete(`/${id}`),
  batchUpdateCars: (carsToUpdate) => {
    return api.put('/batchUpdate', carsToUpdate);
  },
  getOlderCars: () => {
    return api.get(`${baseURL}/olderthan5years`);
  },
};





