import { productModel } from "../models/products.model.js";


const getProductsDb = async()=>{
    const products= await productModel.find();
    return products
}




const getproductsbyidDb = async (id)=>{
    const products = await productModel.findById(id);

    return products;
};


const createproducrdb =async (data)=>{
    const product = await productModel.create(data);

    return product;
}


const updateDb =  async (id, data) =>{
    await productModel.findByIdAndUpdate(id,data); // modifica pero no nos devuelve la data actualizada
    const product=  await productModel.findById(id);

    return product
};


const deleteOneDb = async (id) =>{

    const product = await productModel.deleteOne({_id: id}); //  con el _id busco el campo id de mongo que sea igual al que pase como parametro
    if(product.deletedCount=== 0) return false
    return true
};


export default {
    getProductsDb,
    getproductsbyidDb,
    createproducrdb,
    updateDb,
    deleteOneDb,
}