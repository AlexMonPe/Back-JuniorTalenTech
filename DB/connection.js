const mongoose = require('mongoose');

const connection = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/juniortalentech')
    }catch(error){
        console.log(error, 'Error connecting to DB')
    }
}

module.exports = connection;