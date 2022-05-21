const bcrypt = require("bcrypt");


const hasher = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.log(error, 'Error hashing password');
    }
}

module.exports = {hasher}