const mongoose = require('mongoose');

module.exports.connection = async () =>{
    try{
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true } )
    }catch(error){
        console.log(error, 'Error connecting to DB')
    }
}
