import bcrypt from "bcrypt";

//funcion que haseha la contraseña
export const createHash= (password)=>{
    // el metodo hashSync() de bcrypt se encarga del hasheo y toma como parametros
    //primer parametro contraseña a enmcriptar ( que la pasamos como parametro en la funcion)
    //segundo parametro bcrypt.genSaltSync(), cantidad de caracteres con los cuales encripta por estandar mandale 10
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10)) 
}

//funcion de validacion de contraseña y devuelve valor booleano de true o false


// la funcion puede recibir el usuario o directamente el user.password
export const isValiPassword = (user,password)=>{

    // metodo bcrypt.compareSync() que compara el pasword ingresado en el login
    //primer parametro el pasword  y segundo parametro el pasword del usuario ( user.passwprd)
    return bcrypt.compareSync(password, user.password)
}
