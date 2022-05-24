const bcrypt = require("bcrypt");


const hasher = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.log(error, 'Error hashing password');
    }
}

const compareHash = async (password, pwdhashed) => {
    try{
      return await bcrypt.compare(password, pwdhashed)
      }catch(error){
        console.log('Password needed', error)
      }
    }

module.exports = {hasher, compareHash}