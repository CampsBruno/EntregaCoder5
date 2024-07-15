
import Router from "express";
import productsRouter from "./products.router.js";
import carsRouters from "./carts.router.js"
import sessionRouter from "./session.routes.js"
import { isLogin } from "../middlewares/is.login.middleware.js";
const router= Router();

router.use("/products", productsRouter); // aplico el middleware para determinar si el usuario esta logueado, si no no me permite la consulta
router.use("/carts", carsRouters);
router.use("/session",sessionRouter);




export default router;
