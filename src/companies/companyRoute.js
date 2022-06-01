const express = require("express");
const router = express.Router();

const { createCompany, getCompanyByUserId } = require("./companyController.js");

//Create company.
router.post("/", createCompany);
router.get('/:id', getCompanyByUserId)

module.exports = router;
