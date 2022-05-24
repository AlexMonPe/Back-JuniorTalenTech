const mongoose = require('mongoose');
const Users = require('../users/userModel.js');

// Schema: Candidate
const Schema = new mongoose.Schema({
  // idUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  name: {type: String, required: true},
  surname: {type: String, required: true},
  born_date: {type: String, required: true},
  phone_number: {type: Number, required: true},
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
      start_year: {type: Number, required: true},
      finish_year: {type: Number, required: true},
  }],
  abilities: [{type: String, required: true}],
  languages: [{
    language_name: String,
    language_level: String
  }]
});

module.exports.Candidates = mongoose.model("Candidates", Schema);
