const express = require("express");
const { login, updateUser } = require("./userController");
const router = express.Router();

router.post('/login', login);
router.patch('/:id', updateUser);


module.exports = router;