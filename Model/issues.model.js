const mongoose = require('mongoose');

//simple schema
const IssuesSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    maxlength: 50
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  commentslist: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }
  ]
});


const issues = mongoose.model('Issues', IssuesSchema);
exports.Issues = issues; 
