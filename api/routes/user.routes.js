import express from "express";
import { test,updateUserInfo } from "../controller/user.controller.js";

import { verifyToken } from "../utils/verifyuser.js";

const router = express.Router();


router.get("/test",test)
router.post('/update/:id',verifyToken, updateUserInfo)
 
export  default router;