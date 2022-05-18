import mongoose from "mongoose";

const connection = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mytests')
    }catch(error){
        console.log(error)
    }
}

export default connection;