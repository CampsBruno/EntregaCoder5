import { userModel } from "../models/user.models.js";



const getAllUsers = async () =>{
    const users= await userModel.find();
    return users
};

//obtengo  useros po ID de la base de datos
const getusersbyidDb = async (id)=>{
    const users = await userModel.findById(id);

    return users;
};

//obtengo  useros por EMAIL de la base de datos
const getusersbyemailDb = async (email)=>{
    const users = await userModel.findOne({ email });

    return users;
};

//Creo un nuevo usero en la base de datos
const createUserdb =async (data)=>{
    const user = await userModel.create(data);

    return user;
}

//Actualizo un usero en la base
const updatUsereDb =  async (id, data) =>{
    await userModel.findByIdAndUpdate(id,data); // modifica pero no nos devuelve la data actualizada
    const user=  await userModel.findById(id);

    return user
};

//borro produto de la base de datos
const deleteOneUserDb = async (id) =>{

    const user = await userModel.deleteOne({_id: id}); //  con el _id busco el campo id de mongo que sea igual al que pase como parametro
    if(user.deletedCount=== 0) return false
    return true
};

export default {
    getAllUsers,
    getusersbyidDb,
    createUserdb,
    updatUsereDb,
    deleteOneUserDb,
    getusersbyemailDb,
};