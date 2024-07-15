import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { createHash, isValiPassword } from "../utils/hasPassword.js"
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";

const router= Router()



router.post("/register",passport.authenticate("register") ,async(req,res)=>{
    try{
        res.status(201).json({status:"Success", message:"Usuario Creado"})
    
    }catch(error){console.log(error)
    res.status(500).json({status:"Error",message:"Internal Server Error"})
    }
})




//como en register agrego el midelware de  passport
router.post("/login", passport.authenticate("login"),async(req,res)=>{ // acordate que llamaste la funcion login
    try{
         return res.status(201).json({status: "Succes", payload: req.user})
    }catch(error){console.log(error)
    res.status(500).json({status:"Error",message:"Internal Server Error"})
    }
})



//como en register agrego el midelware de  passport
router.get("/google", passport.authenticate("google", 
    {scope: ["https://www.googleapis.com/auth/userinfo.email", 
        "https://www.googleapis.com/auth/userinfo.profile"],   // de aca obtierne los datos
         session: false}),async(req,res)=>{ // acordate que llamaste la funcion login

    try{
         return res.status(201).json({status: "Succes", payload: req.user})
    }catch(error){console.log(error)
    res.status(500).json({status:"Error",message:"Internal Server Error"})

    }
})


//ruta de JWT
router.post("/jwt", async(req,res)=>{ 
       try{
        
        const { email, password }= req.body;
        const user= await userDao.getusersbyemailDb(email)
        if(!user  ||  !isValiPassword(user, password)) return res.status(401).json({status:"Error", msg:"Email o contraseña invalida"})

        const token =  createToken(user)   // el token que le devolvemos al usuario tiene cifrada su email y contraseña
        //guardar token en coockie
        res.cookie("token", token, { httpOnly: true })// lo de httpOnly nos dice que la cookie solo va a estar disponible en peticion http

         return res.status(201).json({status: "Succes", payload: user, token})
    
    }catch(error){console.log(error)
    res.status(500).json({status:"Error",message:"Internal Server Error"})
    }
})



// Chekeo de token
router.get("/current", (req,  res)=>{
    try{
        const token = req.cookies.token;
        const checkToken = verifyToken(token);

        if(!checkToken) return res.status(403).json({status:"Error", msg:"invalid Token"});

            return res.status(201).json({status: "Succes", payload: checkToken});

    }catch(error){console.log(error)
        res.status(500).json({status:"Error",message:"Internal Server Error"});
        }

});





router.get("/logout", async (req,res)=>{
    try{

        req.session.destroy()
        res.status(200).json({status:"Exito", message: "Session Cerrada"})

    }catch(error){console.log(error)
        res.status(500).json({status:"Error",message:"Internal Server Error"})
        }

})


export default router;
