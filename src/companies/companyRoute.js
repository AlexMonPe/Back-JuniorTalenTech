const express = require("express");
const router = express.Router();

const { createCompany } = require("./companyController.js");


//Create company.
router.post('/', createCompany);

module.exports = router;