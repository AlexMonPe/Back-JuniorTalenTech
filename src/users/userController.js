const jwt = require("jsonwebtoken");
const { compareHash } = require("../services/bcrypt.js");
const {Users} = require("./userModel.js");
const env = require("dotenv");

env.config();

const login = async (req, res, next) => {
  try {
    let userFound = await Users.findOne({
      email: req.body.email,
    });

    if (!userFound || !await compareHash(req.body.password, userFound.password)) 
    return res.status(400).json({ error: "User not found" });

    const token = jwt.sign(
        { email: req.body.email, id: userFound._id, role: userFound.role },
        process.env.SECRET_KEY
        );

   res.status(200).json({ token: token, id: userFound._id, role: userFound.role });

  } catch (error) {
    console.log(error);
    res.status(401).send(error, 'Error in login');
  }
};

const updateUser = (req,res) => {
  try {
    await Users.updateOne({_id: req.params.id}, req.body);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = { login, updateUser };
