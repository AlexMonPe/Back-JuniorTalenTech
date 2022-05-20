const mongoose = require('mongoose');

// Schema: Candidate
const Schema = new mongoose.Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  born_date: {type: String, required: true},
  phone_number: {type: Number, required: true, unique: true},
  city: {type: String, required: true},
  title: String,
  training: [
    {
      level: {type: String, required: true},
      specialty: {type: String, required: true},
      center: {type: String, required: true},
      start_year: {type: Number, required: true},
      finish_year: {type: Number, required: true},
    },
  ],
  experience: [{
      company_name: {type: String, required: true},
      work_name: {type: String, required: true},
      functions: {type: String, text: true, required: true},
      tecnologies: String,
      start_year: {type: Number, required: true},
      finish_year: {type: Number, required: true},
  }],
  abilities: [{type: String, required: true}],
  languages: [String]
});
const Candidates = mongoose.model("Candidate", Schema);
module.exports = Candidates;
