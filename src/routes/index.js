
import Router from "express";
import productsRouter from "./products.router.js";
import carsRouters from "./carts.router.js"

const router= Router();

router.use("/products", productsRouter);
router.use("/carts", carsRouters);




export default router;