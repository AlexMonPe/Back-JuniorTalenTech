const mongoose = require("mongoose");
const Users = require("../users/userModel.js");

// Schema: Company
const Schema = new mongoose.Schema({
  // idUser: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  name: { type: String, required: true },
  title: String,
  description: String,
  ubication: { type: String, required: true },
  website: String,
  cif: { type: String, required: true },
  phone_number: { type: Number, required: true },
  employees: String,
});

module.exports.Companies = mongoose.model("Companies", Schema);
