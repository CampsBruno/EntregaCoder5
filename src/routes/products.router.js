import Router, { json } from "express";
import productManager from "../dao/fsManagers/productManager.js" 
import productDao from "../dao/mongoDao/product.dao.js";

const router= Router();




// Obtener todos los prodyuctos

router.get("/", async (req,res)=>{
    try{
    
    const queryParams = req.query; // toma todas las querys para enviarlas y filtrarlas en el dao
    
    
    const products = await productDao.getProductsDb(queryParams)

    res.status(200).json({status: "succes", payload: products});

    }catch(error){
        console.log(error);
        res.status(500).json({status:"Error", msg:"Error del Servidor"})
}});





//   Pedir productos por ID

router.get("/:pid", async (req,res)=>{
    try{

        const {pid} = req.params;
        const product = await productDao.getproductsbyidDb(pid)

        if(!product) return res.status(404).json({status: "Error", msg: `Producto con id ${pid} no encontrado`})
      
        res.status(200).json({status: "succes", payload: product})
    }catch(error){
            console.log(error);
            res.status(500).json({status:"Error", msg:"Error del Servidor"})
    };
})





//Agregar Producto

router.post("/", async (req,res)=>{
    try{

       const producto = req.body
       const validador = await productDao.createproducrdb(producto)
       res.status(201).json(producto)
      
    }catch (error){
        console.log(error)
        res.status(500).json({status:"Error", msg:"Error del Servidor"})
    }
});





//Borrar produrcto

router.delete("/:pid", async (req,res)=>{
    try{

    
        const {pid} = req.params
        const deleteProduct = await productDao.deleteOneDb(pid)
       
        if(!deleteProduct) return res.status(404).json({status:"Error" , msg: `Producto con el id ${pid} no encontrado`})

        res.status(202).json({status: "Producto Eliminado con exito"})

    }catch(error){
        console.log(error)
        res.status(500).json({status:"Error", msg:"Error del Servidor"})
    }
});







// Actualizar Producto

router.put("/:pid", async (req,res)=>{
    try{

    const {pid} = req.params
    const productdata = req.body;
    const updateProduct =  await productDao.updateDb(pid, productdata)

    res.status(201).json({status: "Producto modificado con exito", payload: updateProduct})
    }catch(error){
        console.log(error)
        res.status(500).json({status:"Error", msg:"Error del Servidor"})
    }

});









export default router;


