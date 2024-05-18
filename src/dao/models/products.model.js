import mongoose from "mongoose";

const productColection = "products"

const prodcutsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thmbnail:{
        type: Array,
        default: [],
    },
    code:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    status:{
        type:Boolean,
        default: true
    },
    price:{
        type:Number,
        required:true
    },
});

export const productModel= mongoose.model(productColection,prodcutsSchema)