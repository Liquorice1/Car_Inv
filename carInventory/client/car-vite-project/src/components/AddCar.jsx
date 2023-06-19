import React, { useState } from 'react';
import api from '../api';

const AddCar = () => {
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    registrationNumber: '',
    owner: '',
  });

  // Update carData state when input values change
  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to add a car with the carData
      await api.addCar(carData);
      alert('Car added successfully');
      // Clear the form after successful submission
      setCarData({
        make: '',
        model: '',
        registrationNumber: '',
        owner: '',
      });
    } catch (error) {
      alert('Error adding car');
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Add Car</h2>
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
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
