import { productModel } from "../models/products.model.js";

//obtengo todos los productos de la base de datos
const getProductsDb = async()=>{
    const products= await productModel.find();
    return products
}



//obtengo  productos po ID de la base de datos
const getproductsbyidDb = async (id)=>{
    const products = await productModel.findById(id);

    return products;
};

//Creo un nuevo producto en la base de datos
const createproducrdb =async (data)=>{
    const product = await productModel.create(data);

    return product;
}

//Actualizo un producto en la base
const updateDb =  async (id, data) =>{
    await productModel.findByIdAndUpdate(id,data); // modifica pero no nos devuelve la data actualizada
    const product=  await productModel.findById(id);

    return product
};

//borro produto de la base de datos
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