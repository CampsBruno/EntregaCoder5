import { productModel } from "../models/products.model.js";



//obtengo todos los productos de la base de datos
const getProductsDb = async(queries)=>{
    // Desestructuro el objeto querys si existe, si  no existe, o no tiene paramnetros limite y pagina, los default
    const {
        page,
        limit,
        sort,
        ...filters
    } = queries || {};

    const options={
        page: parseInt(page) || 1,  // usa page como pagina  predeterminaada, y parsea el valor a int, ya uqe viene como string, usa base 10 para la conversion 
        limit: parseInt(limit) || 10,
        sort: sort ? {price:sort==="asc"? 1: -1 } : null,
        lean: true
    };
    try{

        console.log("opciones enviadas",options,  "filtros enviados", filters)
        const products= await productModel.paginate(filters,options)
        //console.log(products)
       // if(products.hasPrevPage){const page = `http://localhost:8080/api/products/${}` }; por ahora no va, seguir despues

    return(products)

    }catch(error){console.log(error)}
    //const products= await productModel.find();  PETICION VIEJA
    //return products
};



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












