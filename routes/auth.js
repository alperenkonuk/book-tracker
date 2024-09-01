import express from "express";
import authController from "../controllers/authController.js"

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);
router.get('/login', authController.loadLoginPage)
router.get('/register', authController.loadRegisterPage)


export default router;
