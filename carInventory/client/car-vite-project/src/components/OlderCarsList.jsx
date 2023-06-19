// OlderCarsList.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';

function OlderCarsList() {
  const [olderCars, setOlderCars] = useState([]);

  useEffect(() => {
    fetchOlderCars();
  }, []);

  // Fetch older cars from the API
  const fetchOlderCars = async () => {
    try {
      const allCars = await api.getCars();
      const fetchedOlderCars = allCars.data.filter(
        (car) => new Date().getFullYear() - parseInt(car.model, 10) > 5
      );
      setOlderCars(fetchedOlderCars);
    } catch (err) {
      console.error('Error fetching older cars:', err);
    }
  };

  return (
    <div>
      <h2>Cars older than 5 years</h2>
      <ul>
        {olderCars.map((car) => (
          <li key={car._id}>
            {car.make} {car.model} ({car.registrationNumber}) - Owned by {car.owner}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OlderCarsList;
