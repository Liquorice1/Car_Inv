const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carController = require('./controllers/carController');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://carrieann:Carrie28@cluster0.cyhw4i5.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api/cars', carController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

