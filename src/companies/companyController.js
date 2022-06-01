const { hasher } = require("../services/bcrypt.js");
const { Users } = require("../users/userModel.js");
const { Companies } = require("./companyModel.js");
const isEmail = require("validator/lib/isEmail.js");

const createCompany = async (req, res) => {
  try {
    const userToCreate = {
      email: req.body.email,
      password: await hasher(req.body.password),
      role: "company",
    };

    const isEmailDuplicated = await Users.findOne({ email: req.body.email });

    if (!req.body.email || !req.body.password)
      return res
        .status(400)
        .json({ error: "Error in email or password, can't be empty" });

    if (!isEmail(req.body.email))
      return res.status(400).json({ error: "Email not valid" });

    if (!req.body.name)
      return res
        .status(400)
        .json({ error: "Error company name, can't be empty" });

    if (isEmailDuplicated)
      return res.status(400).json({ error: "Email already exists" });

    const userCreated = await Users.create(userToCreate);

    if (!userCreated)
      return res.status(400).json({ error: "Error creating user" });

    const companyCreated = await Companies.create({...req.body, idUser: userCreated.id});

    res.status(200).json({
      company: companyCreated,
      user: userCreated,
    });
  } catch (error) {
    res.status(400).json(error, "Error creating company or user");
  }
};


const getCompanyByUserId = async (req, res) => {
  try {
    const companyFound = await Companies.find({ idUser: req.params.id }).populate('idUser');
    res.status(200).json(companyFound)
  } catch (error) {
    res.json({ error: "Error getting company" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const validateIsObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);

    if (!validateIsObjectId) {
      return res.status(400).json({ error: "Empresa no encontrada" });
    }
    const idFound = await Companies.findById({ _id: req.params.id });
    if (!idFound)
      return res.status(400).json({ error: "Empresa no encontrada" });
    
    await Companies.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json("Se han guardado los cambios");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createCompany, getCompanyByUserId, updateCompany };
