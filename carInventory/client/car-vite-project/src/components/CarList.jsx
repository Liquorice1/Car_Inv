// CarList.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';

function CarList({ onEditCar, onCarSelect }) {
  const [cars, setCars] = useState([]);

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch cars from the API
  const fetchCars = async () => {
    try {
      const fetchedCars = await api.getCars();
      setCars(fetchedCars.data);
    } catch (err) {
      console.error('Error fetching cars:', err);
    }
  };

  // Handle car deletion
  const handleDeleteCar = async (id) => {
    try {
      const response = await api.deleteCar(id);
      if (response.status === 200) {
        // Update cars state after successful deletion
        setCars(cars.filter((car) => car._id !== id));
      } else {
        console.error('Error deleting car: Server responded with status', response.status);
      }
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  if (!cars) {
    return <p>Loading...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Make</th>
          <th>Year Model</th>
          <th>Registration Number</th>
          <th>Owner</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car._id}>
            <td>
              <input
                type="checkbox"
                onChange={(e) => onCarSelect(car, e.target.checked)}
              />
            </td>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>{car.registrationNumber}</td>
            <td>{car.owner}</td>
            <td>
              <button onClick={() => onEditCar(car)}>Edit</button>
              <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CarList;
