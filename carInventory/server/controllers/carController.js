
const express = require('express');
const Car = require('./../models/Car');

const router = express.Router();

// List all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a car
router.post('/', async (req, res) => {
  const car = new Car(req.body);

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get cars older than 5 years
router.get('/olderthan5years', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const cars = await Car.find({ year: { $lt: currentYear - 5 } }, { model: 1, make: 1, registrationNumber: 1, owner: 1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get multiple cars by ID
router.put('/batchUpdate', async (req, res) => {
  const carsToUpdate = req.body;

  try {
    const updatedCars = await Promise.all(
      carsToUpdate.map(async (car) => {
        const carToUpdate = await Car.findById(car._id);
        const { fieldName, fieldValue } = car;
        carToUpdate[fieldName] = fieldValue;
        return carToUpdate.save();
      })
    );
    res.json(updatedCars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get car by ID
router.get('/:id', getCar, (req, res) => {
  res.json(res.car);
});

// Update car by ID
router.put('/:id', getCar, async (req, res) => {
  try {
    Object.assign(res.car, req.body);
    const updatedCar = await res.car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete car by ID
router.delete('/:id', async (req, res) => {
  const carId = req.params.id;
  
  try {
    const deletedCar = await Car.findByIdAndDelete(carId);
    
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car deleted' });
  } catch (err) {
    console.error('Error in delete car route handler:', err);
    res.status(500).json({ message: err.message });
  }
});


// Middleware to get car by ID
async function getCar(req, res, next) {
  let car;
  try {
    car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.car = car;
  next();
}

module.exports = router;


