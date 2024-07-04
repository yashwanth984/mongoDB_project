const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bearController = require('./bears/bearController');

const dbURI = 'mongodb://localhost:27017/beardb';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully Connected to MongoDB');
}).catch(err => {
  console.error('Database connection failed', err);
});

const server = express();

server.use(helmet());

// Configure CORS to allow requests from http://localhost:5000
server.use(cors({
  origin: 'http://localhost:5001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);

// Example route to get all bears
server.get('/bears', async (req, res) => {
  try {
    const bears = await Bear.find();
    res.json(bears);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/bears - Create a new bear
server.post('/api/bears', async (req, res) => {
  const { species, latinName } = req.body;
  if (!species || !latinName) {
    return res.status(400).json({ errorMessage: "Please provide both species and latinName for the bear." });
  }
  try {
    const bear = new Bear({ species, latinName });
    const savedBear = await bear.save();
    res.status(201).json(savedBear);
  } catch (error) {
    res.status(500).json({ errorMessage: "There was an error while saving the bear to the database" });
  }
});

// GET /api/bears/:id - Get a bear by id
server.get('/api/bears/:id', async (req, res) => {
  try {
    const bear = await Bear.findById(req.params.id);
    if (bear) {
      res.json(bear);
    } else {
      res.status(404).json({ message: "The bear with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "The bear information could not be retrieved." });
  }
});

// DELETE /api/bears/:id - Delete a bear by id
server.delete('/api/bears/:id', async (req, res) => {
  try {
    const deletedBear = await Bear.findByIdAndDelete(req.params.id);
    if (deletedBear) {
      res.json(deletedBear);
    } else {
      res.status(404).json({ errorMessage: "The bear with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "The bear could not be removed" });
  }
});

// PUT /api/bears/:id - Update a bear by id
server.put('/api/bears/:id', async (req, res) => {
  try {
    const updatedBear = await Bear.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updatedBear) {
      res.json(updatedBear);
    } else {
      res.status(404).json({ message: "The bear with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: "The bear information could not be modified." });
  }
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
