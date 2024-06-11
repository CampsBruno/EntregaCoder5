import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router= Router()

router.post("/register", async(req,res)=>{
    try{
        const userData =  req.body;
        const newUser= await userDao.createUserdb(userData)
        

        if(!newUser){res.status(400).json({status:"Error", msg:"no se pudo crear el usuario"})}
        res.status(201).json({status:"Success", payload: newUser})
    
    }catch(error){console.log(error)
    res.status(500).json({status:"Error",message:"Internal Server Error"})
    }
})




router.post("/login", async(req,res)=>{
    try{
       const { email,password } = req.body
    
       if(email === "adminCoder@coder.com" && password ==="adminCod3r123"  ){ // siendo el usuario coderer, entra como admin
             req.session.user= {
                    email,
                    role: "admin",
             }   
             return res.status(201).json({status: "Succes", payload: req.session.user})
       
            }
            // si no es admin
            const user = await userDao.getusersbyemailDb(email)

            // si no hay usuario, o no conicide la constraseña 
            if(!user || user.password !== password){return res.status(401).json({status:"Error", message: "Usuario o Contraseña incorrectos"})}
            

            req.session.user = {
                email,
                role: "user",
            }

            res.status(200).json({status:"Success", payload: req.session.user})
    }catch(error){console.log(error)
    res.status(500).json({status:"Error",message:"Internal Server Error"})
    }
})


router.get("/logout", async (req,res)=>{
    try{

        req.session.destroy()
        res.status(200).json({status:"Exito", message: "Session Cerrada"})

    }catch(error){console.log(error)
        res.status(500).json({status:"Error",message:"Internal Server Error"})
        }

})


export default router;