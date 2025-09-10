import express from "express";
const router=express.Router();
import {login,signup,logout,onboarding} from "../controllers/auth.js";
import { protectRoute } from "../middlewares/protected.js";
router.post("/login",login
);
router.post("/signup",signup);
router.post("/logout",logout);
router.post("/onboarding",protectRoute,onboarding);
router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({user:req.user});
})
export default router;
