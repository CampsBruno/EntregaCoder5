import express from "express";
 import productManager from "./dao/fsManagers/productManager.js";
import router from "./routes/index.js"
import {conectMongoDB} from "./config/mongoDB.config.js"


conectMongoDB();

const app = express();
const port= 8080


// Midellwares
app.use(express.json());
app.use(express.urlencoded({extended: true}));





app.use("/api",router)


// PRUEBAS
app.get("/test", async (req,res)=>{

    const prueba = await productManager.RefreshPropducts()
    res.status(200).json(prueba)
    console.log(prueba)
})


app.listen(port,()=>{
console.log(`Escuchando en el puero ${port}`);
});




