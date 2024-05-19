import mongoose from "mongoose";
import dotenv from "dotenv"   // agrego variable de entorno virtual

dotenv.config()
// acordate de pasarlo a env
const urlDb = process.env.DB_URL




export const conectMongoDB =  async () => {
    try{mongoose.connect(urlDb)
    console.log("Conectado con Mongo Database")
    }catch(error){ console.log(error)}
};
