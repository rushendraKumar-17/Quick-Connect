import express from 'express';
import { signin, signup,verifyToken } from '../controllers/userControllers.js';
const router = express.Router();

router.post("/signup",signup)

router.post("/signin",signin);
router.get("/",verifyToken);
export default router;