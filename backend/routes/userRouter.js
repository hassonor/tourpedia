import express from "express";
import {googleSignIn, signIn, signUp} from "../controllers/userController";

const router = express.Router();


router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/googleSignIn", googleSignIn)


export default router;

