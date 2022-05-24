const mongoose = require('mongoose');

const connection = async () =>{
    try{
        await mongoose.connect(process.env.DB_URI)
    }catch(error){
        console.log(error, 'Error connecting to DB')
    }
}

module.exports = connection;