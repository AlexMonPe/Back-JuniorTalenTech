const { hasher } = require("../services/bcrypt.js");
const { Users } = require("../users/userModel.js");
const { Candidates } = require("./candidateModel.js");
const isEmail = require("validator/lib/isEmail.js");

const createCandidate = async (req, res) => {
  try {
    const userToCreate = {
      email: req.body.form.email,
      password: await hasher(req.body.form.password),
      role: "candidate",
    };

    const isEmailDuplicated = await Users.findOne({
      email: req.body.form.email,
    });

    if (!req.body.form.email || !req.body.form.password)
      return res
        .status(400)
        .json({ error: "Error in email or password, can't be empty" });

    if (!isEmail(req.body.form.email))
      return res.status(400).json({ error: "Error in email syntax, need @" });

    if (isEmailDuplicated)
      return res.status(400).json({ error: "Email already exists" });

    const userCreated = await Users.create(userToCreate);

    if (!userCreated)
      return res.status(400).json({ error: "Error creating user" });

    const candidateCreated = await Candidates.create({...req.body, idUser: userCreated.id });

    res.status(200).json({
      candidate: candidateCreated,
      user: userCreated,
    });
  } catch (error) {
    res.status(400).json(error, "Error creating candidate or user");
  }
};

const updateCandidate = async (req, res) => {
  try {
    const validateIsObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);

    if (!validateIsObjectId) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }
    const idFound = await Candidates.findById({ _id: req.params.id });
    if (!idFound)
      return res.status(400).json({ error: "Usuario no encontrado" });

    await Candidates.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json("Se han guardado los cambios");
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCandidateByUserId = async (req, res) => {
  try {
    const candidateFound = await Candidates.find({ idUser: req.params.id }).populate('idUser');
    console.log(candidateFound, 'candidatefound')
    res.status(200).json(candidateFound)
  } catch (error) {
    res.json({ error: "Error getting candidate" });
  }
};

module.exports = { createCandidate, updateCandidate, getCandidateByUserId };
