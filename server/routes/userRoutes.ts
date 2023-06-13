import express, {Router} from "express";
import {UserController} from "../controller/userController";
// Create a new router instance
const router: Router = express.Router();
const userController = new UserController();

router.post("/register", userController.register);

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.post("/login", userController.login);

export default router;
