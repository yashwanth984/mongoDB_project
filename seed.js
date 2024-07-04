const mongoose = require('mongoose');
const Bear = require('./bears');

const dbURI = 'mongodb://localhost:27017/beardb';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully Connected to MongoDB for Seeding');
}).catch(err => {
  console.error('Database connection failed', err);
});

const bearSpecies = [
  { species: 'American Black Bear', latinName: 'Ursus americanus' },
  { species: 'Asiatic Black Bear', latinName: 'Ursus thibetanus' },
  { species: 'Brown Bear', latinName: 'Ursus arctos' },
  { species: 'Giant Panda', latinName: 'Ailuropoda melanoleuca' },
  { species: 'Polar Bear', latinName: 'Ursus maritimus' },
  { species: 'Sloth Bear', latinName: 'Melursus ursinus' },
  { species: 'Spectacled Bear', latinName: 'Tremarctos ornatus' },
  { species: 'Sun Bear', latinName: 'Helarctos malayanus' },
  { species: 'Kermode Bear', latinName: 'Ursus americanus kermodei' },
  { species: 'Glacier Bear', latinName: 'Ursus americanus emmonsii' },
  { species: 'Himalayan Brown Bear', latinName: 'Ursus arctos isabellinus' },
  { species: 'Kodiak Bear', latinName: 'Ursus arctos middendorffi' }
];

Bear.insertMany(bearSpecies)
  .then(() => {
    console.log('Bears have been added successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding bears:', err);
    mongoose.connection.close();
  });
