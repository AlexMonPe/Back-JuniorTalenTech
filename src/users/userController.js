const jwt = require("jsonwebtoken");
const { compareHash } = require("../services/bcrypt.js");
const { Users } = require("./userModel.js");
const isEmail = require("validator/lib/isEmail.js");

const env = require("dotenv");

env.config();

const login = async (req, res, next) => {
  try {
    let userFound = await Users.findOne({
      email: req.body.email,
    });
    if (!userFound || !(await compareHash(req.body.password, userFound.password)))
      return res.status(400).json({ error: "Usuario o contraseña incorrecta" });

    const token = jwt.sign(
      { email: req.body.email, id: userFound._id, role: userFound.role },
      process.env.SECRET_KEY
    );

    res
      .status(200)
      .json({ token: token, id: userFound._id, role: userFound.role });
  } catch (error) {
    console.log(error);
    res.status(401).send(error, "Error in login");
  }
};

const updateUser = async (req, res) => {
  try {
    const validateIsObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);

    if (!validateIsObjectId) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    const idFound = await Users.findById({ _id: req.params.id });

    if (!idFound)
      return res.status(400).json({ error: "Usuario no encontrado" });

    if (!isEmail(req.body.email))
      return res.status(400).json({ error: "Email no valido" });

    await Users.updateOne({ _id: req.params.id }, req.body);

    res.status(200).json("Se han guardado los cambios");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { login, updateUser };
