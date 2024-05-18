import Router, { json } from "express";
import productManager from "../dao/fsManagers/productManager.js" 
import productDao from "../dao/mongoDao/product.dao.js";

const router= Router();




// Obtener todos los prodyuctos

router.get("/", async (req,res)=>{
    try{
      //File sistem
                 //const {limit} = req.query;  // desesctructuramos la query que viene con el vcalor de limit de Filesistem
                // const products = await productManager.getProducts();
    //----------------------------------   Mongo ----------------------------------------------------
    
    const products = await productDao.getProductsDb()

    res.status(200).json({status: "succes", payload: products});

    }catch(error){
        console.log(error);
}});





//   Pedir productos por ID

router.get("/:pid", async (req,res)=>{
    try{
                    //const {pid} = req.params;
                    // obrengo los parametros de la ruta, en este caso el /products/:PID el pid
                    //const products =await productManager.getProductById(pid)  // await clave para que lo devuelva
   //----------------------------------   Mongo ---------------------------------------------------- 

        const {pid} = req.params;
        const product = await productDao.getproductsbyidDb(pid)

        if(!product) return res.status(404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})
      
        res.status(200).json({status: "succes", payload: product})
    }catch(error){
            console.log(error);
    };
})





//Agregar Producto

router.post("/", async (req,res)=>{
    try{
                            // const producto = req.body
                            // const validador = await productManager.addProduct(producto)
                            // if(validador) { res.status(200).json(producto)} else {res.status(401).json({message: "Todos los campos del producto son obligatorios o Ya existe el codigo del producto"})}
//----------------------------------   Mongo ----------------------------------------------------

       const producto = req.body
       const validador = await productDao.createproducrdb(producto)
       res.status(201).json(producto)
      
    }catch (error){
        console.log(error)
    }
});





//Borrar produrcto

router.delete("/:pid", async (req,res)=>{
    try{
                                //const {pid} = req.params
                                //const deleteProduct = productManager.deleteProduct(pid)
//----------------------------------   Mongo ----------------------------------------------------
       
        const {pid} = req.params
        const deleteProduct = await productDao.deleteOneDb(pid)
       
        if(!deleteProduct) return res.status(404).json({status:"Error" , msg: `Producto con el id ${pid} no encontrado`})

        res.status(202).json({status: "Producto Eliminado con exito"})

    }catch(error){
        console.log(error)
    }
});







// Actualizar Producto

router.put("/:pid", async (req,res)=>{
    try{
                     //const {pid} = req.params
                     //const producto = req.body;
                     //const updateProduct =  await productManager.updateproduct(pid, producto)
//----------------------------------   Mongo ----------------------------------------------------
    
    const {pid} = req.params
    const productdata = req.body;
    const updateProduct =  await productDao.updateDb(pid, productdata)

    res.status(201).json({status: "Producto modificado con exito", payload: updateProduct})
    }catch(error){
        console.log(error)
    }

});









export default router;


