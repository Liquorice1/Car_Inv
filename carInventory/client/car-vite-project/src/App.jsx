// App.jsx
import React, { useState, useEffect } from 'react';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import BatchUpdateCarField from './components/BatchUpdateCarField';
import CarList from './components/CarList';
import OlderCarsList from './components/OlderCarsList';
import api from './api';

function App() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [batchUpdate, setBatchUpdate] = useState(false);
  const [selectedCars, setSelectedCars] = useState([]);
  const [showOlderCars, setShowOlderCars] = useState(false);

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

  const handleEditCar = (car) => {
    setSelectedCar(car);
  };

  // Handle closing the edit car modal and updating the car list if necessary
  const handleCloseEditCar = (updatedCar) => {
    setSelectedCar(null);
    if (updatedCar) {
      setCars(cars.map((car) => (car._id === updatedCar._id ? updatedCar : car)));
    }
  };

  // Handle click on the batch update button
  const handleBatchUpdateClick = () => {
    setBatchUpdate(true);
  };

  // Handle closing the batch update modal and updating the car list if necessary
  const handleCloseBatchUpdate = (updatedCars) => {
    setBatchUpdate(false);
    if (updatedCars) {
      const updatedCarIds = updatedCars.map((car) => car._id);
      setCars(
        cars.map((car) =>
          updatedCarIds.includes(car._id)
            ? updatedCars.find((updatedCar) => updatedCar._id === car._id)
            : car
        )
      );
    }
  };

  // Handle selecting/unselecting a car in the car list
  const handleCarSelect = (car, checked) => {
    if (checked) {
      setSelectedCars([...selectedCars, car]);
    } else {
      setSelectedCars(selectedCars.filter((selected) => selected._id !== car._id));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Car Inventory</h1>
      </header>
      <main>
        <AddCar onCarAdded={(newCar) => setCars([...cars, newCar])} />
        <CarList cars={cars} onEditCar={handleEditCar} onCarSelect={handleCarSelect} />
        <button onClick={() => setShowOlderCars(!showOlderCars)}>
          {showOlderCars ? 'Hide' : 'Show'} cars older than 5 years
        </button>
        {showOlderCars && <OlderCarsList />}
        {selectedCar && (
          <EditCar car={selectedCar} onCloseEditCar={handleCloseEditCar} />
        )}
        {selectedCars.length > 0 && (
          <button onClick={handleBatchUpdateClick}>Update Selected Cars</button>
        )}
        {batchUpdate && (
          <BatchUpdateCarField
            selectedCars={selectedCars}
            onCloseBatchUpdate={handleCloseBatchUpdate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
``
