
import React, { useState } from 'react';
import api from '../api';

const BatchUpdateCarField = ({ selectedCars, onCloseBatchUpdate }) => {
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  // Handle field name selection
  const handleChange = (event) => {
    setFieldName(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate field name and field value
    if (!fieldName || !fieldValue) {
      alert('Please select a field and enter a new value');
      return;
    }

    try {
      // Perform batch update API call for selected cars
      await api.batchUpdateCars(
        selectedCars.map((car) => ({
          _id: car._id,
          fieldName,
          fieldValue,
        }))
      );

      // Close the batch update component after successful update
      onCloseBatchUpdate();
    } catch (error) {
      console.error('Error updating selected cars:', error);
      alert('Failed to update selected cars');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Batch Update</h2>
      <label htmlFor="field-select">Field to update:</label>
      <select id="field-select" value={fieldName} onChange={handleChange}>
        <option value="">Select a field</option>
        <option value="make">Make</option>
        <option value="model">Year Model</option>
        <option value="year">Year</option>
        <option value="registrationNumber">Registration Number</option>
        <option value="owner">Owner</option>
      </select>
      <label htmlFor="field-value">New value:</label>
      <input
        id="field-value"
        type="text"
        value={fieldValue}
        onChange={(event) => setFieldValue(event.target.value)}
      />
      <button type="submit">Update Selected Cars</button>
      <button onClick={onCloseBatchUpdate}>Cancel</button>
    </form>
  );
};

export default BatchUpdateCarField;
