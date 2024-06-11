import mongoose from "mongoose";

const userCollections = "user"


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String,
    password: String,
    age: Number

});


export const userModel = mongoose.model(userCollections, userSchema);