const express = require("express");
const router = express.Router();

const { createCompany, getCompanyByUserId, updateCompany } = require("./companyController.js");

//Create company.
router.post("/", createCompany);
router.get('/:id', getCompanyByUserId);
router.patch('/:id', updateCompany);


module.exports = router;
