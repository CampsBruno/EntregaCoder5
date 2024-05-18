import fs from "fs"


let carts = []
const pathFile = "./src/dao/fsManagers/data/carts.json"

// Obtengo los carritos
const getCarts = async ()=> {
   const cartsJson = await fs.promises.readFile(pathFile, "utf8");
   carts = JSON.parse(cartsJson) || [];

   return carts
};

// Creo el carrito
 const createCart = async ()=>{
    await getCarts();
    const newCart ={
        id : carts.length +1,
        product: []
    };

    carts.push(newCart);
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return newCart;
 };

 // Obtengo el carriot por el ID
 const getCartsbyID = async (cid) =>{
    await getCarts()
    const IdtoInt = parseInt(cid);
    const Cart = carts.find((cartid)=> carts.id === IdtoInt);
    if(!Cart) return `no se encuentra carriro con el id ${IdtoInt}`
    return Cart.products;
 }



// Agrego productos al carrito
 const addProductToCart = async (cid, pid)=>{
    const Carrito = await getCarts();
    const cartID = parseInt(cid)
  
    const index = carts.findIndex( c => c.id === cartID)
    if(index === -1) return " carrito no existente"
    
    carts[index].product.push({   // Objeto pusheado con dos propiedades, producto y cantidad
        producto:pid,
        quantity: 1
    })
    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
   return carts[index]
};





 const test = async ()=>{
    return "llamo la funcion con exito"
 }


 export default{
    getCarts,
    createCart,
    getCartsbyID,
    test,
    addProductToCart,
 };