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
}

const addProducttoCartBd = async (cid,pid)=>{
   try{ 
        const product = await productModel.findById(pid);
        
        if(!product) return {
            product: false
        }
        

        await cartsModel.findByIdAndUpdate(cid, {$push:{products:product}}) //obtengo por id y actualizo

        const cart = await cartsModel.findById(cid)
        if (!cart) return {
            cart: false
        }

        
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






export default {
    getcartsDb,
    getcartsbyidDb,
    createcartcrdb,
    addProducttoCartBd,
    deleteCartbyidBd,
 
}