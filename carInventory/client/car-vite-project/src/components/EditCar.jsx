
import React, { useState, useEffect } from 'react';
import api from '../api';

const EditCar = ({ car, onCloseEditCar }) => {
  const id = car ? car._id : null;
  const [carData, setCarData] = useState(car || {});
  const [loading, setLoading] = useState(!car);

  // Fetch car data from the API
  const fetchCarData = async () => {
    if (!id) return;
    try {
      const response = await api.getCarById(id);
      setCarData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  // Fetch car data on component mount or when the ID changes
  useEffect(() => {
    fetchCarData();
  }, [id]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.updateCar(id, carData);
      alert('Car data updated successfully!');
      onCloseEditCar();
    } catch (error) {
      console.error('Error updating car data:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Make: </label>
            <input type="text" name="make" value={carData.make} onChange={handleChange} required />
          </div>
          <div>
            <label>Year Model: </label>
            <input type="text" name="model" value={carData.model} onChange={handleChange} required />
          </div>
          <div>
            <label>Registration Number: </label>
            <input type="text" name="registrationNumber" value={carData.registrationNumber} onChange={handleChange} required />
          </div>
          <div>
            <label>Owner: </label>
            <input type="text" name="owner" value={carData.owner} onChange={handleChange} required />
          </div>
          <button type="submit">Update Car</button>
          <button type="button" onClick={onCloseEditCar}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EditCar;
