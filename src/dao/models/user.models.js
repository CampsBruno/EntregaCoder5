import mongoose from "mongoose";

const userCollections = "user"


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,  
    },
    password: String,
    age: Number,

});


export const userModel = mongoose.model(userCollections, userSchema);