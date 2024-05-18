import fs from "fs";

let products = [];
let pathFile = "./src/dao/fsManagers/data/products.json";

// carga  los productos del json
const RefreshPropducts = async () =>{
  try{
    
  const productsJson = await fs.promises.readFile(pathFile, "utf8");
  const productos = JSON.parse(productsJson) || [];
  
  return productos

  }catch(error){
    console.log(error);
    throw error;
  }

};


// llama todos los  productos, con la opción de asignar un límite
const getProducts = async (limit) => {
  try {
    
    // Leer el archivo JSON de productos
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    
    // Parsear el JSON a un array de productos
    const products = JSON.parse(productsJson) || [];

    // Verificar si se ha especificado un límite
    if (!limit) {
      // Si no hay límite, retornar todos los productos
      return products;
    } else {
      // Si se especificó un límite, retornar una porción de los productos
      return products.slice(0, limit);
    }
  } catch (er) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error('Error al obtener los productos:', er);
    throw er; // Re-lanzar el error para que sea manejado externamente si es necesario
  }
};




// busca dentro de los productos hasta encontrar el  que se indica
const getProductById = async (id) => {
  try {
    const productos = await getProducts();  // obtengo los productosd
    
    const productId = parseInt(id); // Convertir el ID a un número
    const product = productos.find((producto) => producto.id === productId);  // busco si se encuentra el producto solicitado
    if (!product) {
      console.log(`No se encontró el producto con el id ${id}`); 
      return;
    }

    console.log(product);
    return product;
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
  }
};



//Agrego productos
const addProduct = async (product) => {
  const { title, description, price, thumbnail, code, stock } = product;
  const listaProductos = await RefreshPropducts()
  const newProduct = {
    id: listaProductos.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status:true
  };

  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return false;
  }

  const productExists = listaProductos.find((product) => product.code === code);
  if (productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return false;
  }
  listaProductos.push(newProduct)


  await fs.promises.writeFile(pathFile, JSON.stringify(listaProductos));
  return true
};




// Borro producto
const deleteProduct = async(id) => {
  try{
  const productos = await getProducts();
  const productId = parseInt(id); 
  const product = productos.filter((producto) => producto.id !== productId);
  await fs.promises.writeFile(pathFile, JSON.stringify(product));

 }catch(error){
  console.log(error);
}
};


// Modifico producto
const updateproduct = async (id, dataProduct) =>{
  try{
    const productos = await getProducts();
    const productID = parseInt(id)
    const index = productos.findIndex((product) => product.id === productID);
   
    productos[index] = {
        ...productos[index],
        ...dataProduct};

    await fs.promises.writeFile(pathFile, JSON.stringify(productos))

  }catch(error){
    console.log(error)
  }
};









export default {
  addProduct,
  getProductById,
  getProducts,
  RefreshPropducts,
  deleteProduct,
  updateproduct,
};
