
import Router from "express";
import productsRouter from "./products.router.js";
import carsRouters from "./carts.router.js"
import sessionRouter from "./session.routes.js"

const router= Router();

router.use("/products", productsRouter);
router.use("/carts", carsRouters);
router.use("/session",sessionRouter);




export default router;