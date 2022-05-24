const jwt = require("jsonwebtoken");
const { compareHash } = require("../services/bcrypt.js");
const Users = require("./userModel.js");
const env = require("dotenv");

env.config();

const login = async (req, res, next) => {
  try {
    let userFound = await Users.findOne({
      email: req.body.email,
    });

    if (userFound) {
      if (await compareHash(req.body.password, userFound.password)) {
        const token = jwt.sign(
          { email: req.body.email, id: userFound._id, role: userFound.role },
          process.env.SECRET_KEY
        );
        res.json({ token: token, id: userFound._id, role: userFound.role });
      } else {
        res.status(404).send({ error: "Password is wrong" });
      }
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

module.exports = { login };
