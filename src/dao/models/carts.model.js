import mongoose from "mongoose";

const cartsCollection ="carts"



const cartsSchema= new mongoose.Schema({
    products:{
        type:[{ product: { type: mongoose.Schema.Types.ObjectId, ref: "products" }, // este products es el productColection de el products model ( como se llama la coleccion) 
         quantity:Number }] 
         
    },  // poroducts tiene como primera propiedad, la referencia hacia el  id de products y como segunda propiedad  la cantiidad
});

// agrego el Middleware
cartsSchema.pre("find",
    function(){
        this.populate("products.product");
    });



export const cartsModel = mongoose.model(cartsCollection,cartsSchema)