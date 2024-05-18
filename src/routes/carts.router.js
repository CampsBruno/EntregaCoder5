import Router from "express";
import cartsManager from "../dao/fsManagers/cartsManager.js";

const router = Router();


//Testeo
router.get("/test", async (req,res)=>{
    const prueba= await cartsManager.test()
    console.log("prueba con exito")
    
    res.status(201).json(prueba)
})




// Crear carrito
router.post("/", async (req,res)=>{
    try{
        const carts = await cartsManager.createCart() 
        res.status(201).json(carts)

    }catch(error){
        console.log(error)
    }
});



//Obtener todos los carritos
router.get("/", async (req , res)=>{
    try{    
            const carts = await cartsManager.getCarts()

            res.status(200).json(carts)

    }catch(error){
        console.log(error)}
})


// Obtener  cart por id
router.get("/:cid", async(req,res)=>{
    try{
        const {cid} = req.params

        const cart = cartsManager.getCarts(cid)
        res.status(200).json(cart)

    }catch(erro){
        console.log(erro)}
});



// Agregar Productos al carrito
router.post("/:cid/product/:pid", async(req,res)=>{
        try{
            const {cid, pid} = req.params
            const cart = await cartsManager.addProductToCart(cid, pid);

            res.status(201).json(cart);

        }catch(error){console.log(error)}

});




export default router;

