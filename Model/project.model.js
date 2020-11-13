const mongoose = require('mongoose');

//simple schema
const ProjectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    maxlength: 20
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
});


const project = mongoose.model('Project', ProjectSchema);
exports.Project = project; 
