import { request, response } from "express";






export const isLogin =  async (req= request, res= response, next)=>{

    if(req.session.user){  // acordate que la session no existe me da false o undefined
        next();
    }else {

        res.status(401).json({status:"Error",msg:"Requiere un Usuario Logueado"})
    }

}