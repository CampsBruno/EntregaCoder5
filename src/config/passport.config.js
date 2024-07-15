import passport  from "passport";
import local from "passport-local"
import { createHash, isValiPassword } from "../utils/hasPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";
import google  from "passport-google-oauth20";
import mongoose from "mongoose";
import dotenv from "dotenv"   // agrego variable de entorno virtual


dotenv.config()
// acordate de pasarlo a env
const idCliente = process.env.id_Cliente;
const secretClient = process.env.SecretoCliente;


//configuro estrategia que voy a usar  ( en este caso local)
const localStrategy  = local.Strategy;
// estrategia de google
const googleStrategy = google.Strategy;

const initializePassport = ()=>{
    // inicializo la estrategia configurada
    passport.use("register",      // estrategia que creamos
         new localStrategy(                                   //passReqToCallback:true , autorizo a passport que axeda al request del usuario
            {passReqToCallback: true,usernameField: "email"}, //usernameField: "email" nos permite decirle  a passport que considere al campo que querramos, en este caso email como username
            async (req,username,password,done) => {  // el done es similar al next en los middelware y  debemos llamarlo al terminar el preoceso de autentificacion
                try{

                    const { firstName, lastName, email, age } = req.body
                    const user= await userDao.getusersbyemailDb(username) // le paso ussername y no email por que ariba defini el username como email
                    if(user) return done(null, false, {message:"user already exist"}); // si elo usuario ya existe manda mensaje
                   
                   const newUser= { // creamos un usuario nuevo y lo hacemosd objeto, pqara controlar la indo que recibamos
                        firstName,
                        lastName,
                         email, 
                          age,
                          password: createHash(password)  // para el password uso la funcion de create has que habiamos creado
                    }
                    const createUser= await userDao.createUserdb(newUser)
                    return done(null, createUser)

                } catch(error){
                    return done(error)}
            }
        )) ;



//login
passport.use("login",
     new localStrategy({usernameField: "email"}, async (username,password,done )=>{
        try{
            const user= await  userDao.getusersbyemailDb(username)

            
            if(!username || !isValiPassword(user,password)) return done(null, false, {message:"Email o Password invalidos"})
            
            return done(null,user)

        }catch{

        }
     })
    );


// google estrategy
passport.use("google",
    new googleStrategy(
        {clientID: idCliente,
        clientSecret: secretClient,
        callbackURL: "http://localhost:8080/api/session/google"   // a que direccion de nuestros datos se va a 
        },
        async (accesToken, refreshToken, profile, cb)=>{    //cb es la abreviatura de calbaak, seria igual a un DONE
            try{
                const { id, name, emails, username} = profile; // informacion qeu google me esta dando del usuario logueado
                //console.log(profile) aca veo todo lo que me devuelve google
                
                const user= {
                    firstName: name.givenName,
                    lastName : name.familyName,
                    email: emails[0].value  // accedo al email de google
                }

            const existUser= await userDao.getusersbyemailDb(emails[0].value)
            if(existUser) return cb(null, existUser);


            const newUser = await userDao.createUserdb(user);
            cb(null, newUser);

            }catch(error){
                return cb(error)
            }


        }    
    )
);





    // serializar
    passport.serializeUser( (user, done)=>{
        done(null, user._id);
    });



    // desserializar
    passport.deserializeUser(async (id,done)=>{
        const user= await userDao.getusersbyidDb(id);
        done(null,user);
    });
                                                                                                   

};

export default initializePassport;