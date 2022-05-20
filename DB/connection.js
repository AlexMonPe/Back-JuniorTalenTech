const mongoose = require('mongoose');

module.exports.connection = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mytests')
    }catch(error){
        console.log(error)
    }
}