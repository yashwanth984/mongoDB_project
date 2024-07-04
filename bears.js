const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BearSchema = new Schema({
  species: {
    type: String,
    required: true
  },
  latinName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Bear', BearSchema);
