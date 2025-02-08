import express from "express";
import { addToCart, removerFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middlewares/auth.js";


const cartRouter = express.Router();

cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/remove", authMiddleware, removerFromCart);
cartRouter.post("/add", authMiddleware, addToCart);


export default cartRouter;