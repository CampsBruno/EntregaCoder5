import { cartsModel } from "../models/carts.model.js";
import { productModel } from "../models/products.model.js";

//obtengo todos los carrito de la base de datos
const getcartsDb = async()=>{
    const carts= await cartsModel.find();
    return carts
}


//obtengo  carrito po ID de la base de datosE
const getcartsbyidDb = async (id)=>{
    const carts = await cartsModel.findById(id);
    return carts;
};


//Creo un nuevo carrito en la base de datos
const createcartcrdb =async (data)=>{
    const cart = await cartsModel.create(data);
    
    return cart;
};


const addProducttoCartBd = async (cid,pid)=>{
   try{ 
        const product = await productModel.findById(pid);
        if(!product) return {
            product: false};
      const productIncart = await cartsModel.findOneAndUpdate({_id:cid, "products.product":pid },{$inc: {"products.$.quantity":1}}) //obtengo por id de carrito y busco por id producto, luego lo aumenta en 1
      console.log("imprimo",productIncart)
      if(!productIncart){
        await cartsModel.findByIdAndUpdate(cid,{ $push:{products:{ product:pid, quantity:1 } }});
      };

      const cart = await cartsModel.findById(cid)
        if (!cart) return {
            cart: false};

    return cart
   } catch(error){console.log(error)}
};




// borrar carrito
const deleteCartbyidBd = async (cid)=>{
    const  cart= await cartsModel.deleteOne({_id:cid})
    console.log(cart)
    if(cart.deletedCount===0) return false
    return true
};




// Borrar productos del carrito
const deleteProductfromCartDb= async(cid,pid)=>{

    const product = await productModel.findById(pid);
    if(!product) return {
        product: false}
// busco el primer elemento de el array que coincida con con los datos y le resto 1 a  la cantidad
    const cart = await cartsModel.findOneAndUpdate({_id:cid,"products.product":pid},{$inc: {"products.$.quantity":-1}});
    if (!cart) return {
        cart: false
    }
    console.log(cart)
};





export default {
    getcartsDb,
    getcartsbyidDb,
    createcartcrdb,
    addProducttoCartBd,
    deleteCartbyidBd,
    deleteProductfromCartDb,
 
}