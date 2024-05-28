import Router from "express";
//import cartsManager from "../dao/fsManagers/cartsManager.js";
import cartDao from "../dao/mongoDao/carts.dao.js"

const router = Router();


//Testeo
router.get("/test", async (req,res)=>{
    //const prueba= await cartsManager.test()
    console.log("prueba con exito")
    
    res.status(201).json({message: "Funciona"})
})




// Crear carrito
router.post("/", async (req,res)=>{
    try{
        const carts = await cartDao.createcartcrdb() 
        res.status(201).json({status: "Creado con exito", payload: carts})

    }catch(error){
        console.log(error)
        res.status(500).json({status:"Error", msg:"Error del Servidor"})
    }
});



//Obtener todos los carritos
router.get("/", async (req , res)=>{
    try{    
            const carts = await cartDao.getcartsDb()
            res.status(200).json({status: "Succes", payload:carts})
    }catch(error){
        console.log(error)
        res.status(500).json({status:"Error", msg:"Error del Servidor"})}
})


// Obtener  cart por id
router.get("/:cid", async(req,res)=>{
    try{
        const {cid} = req.params
        const cart = await cartDao.getcartsbyidDb(cid)
        if(!cart) return res.status(404).json({status:"Error",message:`No existe el carrito con el ID ${cid}` })
        res.status(200).json({status: "Succes", payload:cart})

    }catch(erro){
        console.log(erro)
        res.status(500).json({status:"Error", msg:"Error del Servidor"})}
});



// Agregar Productos al carrito
router.post("/:cid/product/:pid", async(req,res)=>{
        try{
            const {cid, pid} = req.params
            const cart = await cartDao.addProducttoCartBd(cid, pid);
            console.log(cart)
            if(cart.product=== false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con id ${pid} `})
            if(cart.cart === false) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con id ${cid} `})

            res.status(201).json({status:"succes", payload:cart});

        }catch(error){console.log(error)
            res.status(500).json({status:"Error", msg:"Error del Servidor"})
        }

});



// Borrar Productos del carrito
router.delete("/:cid/product/:pid", async(req,res)=>{
    try{
        const {cid, pid} = req.params
        const cart = await cartDao.deleteProductfromCartDb(cid, pid);
        
        if(cart.product=== false) return res.status(404).json({status: "Error", msg: `No se encontro el producto con id ${pid} `})
        //if(cart.cart === false) return res.status(404).json({status: "Error", msg: `No se encontro el carrito con id ${cid} `})

        res.status(201).json({status:"succes", payload:cart});

    }catch(error){console.log(error)
        res.status(500).json({status:"Error", msg:"Error del Servidor"})
    }

});








//borrar carrito 
router.delete("/:cid", async (req,res)=>{
   try{
    const {cid} = req.params
    const cart = await cartDao.deleteCartbyidBd(cid) // pasa como string caminando
    if(!cart) return res.status(404).json({status:"error", msg: `No se encuentra carrito con el id ${cid}`})
    
        res.status(202).json({status:"Exito", msg:`Carritop con id ${pid} eliminado exitosamente`})
}catch(error){console.log(error)
    res.status(500).json({status:"Error", msg:"Error del Servidor"})
}
   
    });






export default router;

