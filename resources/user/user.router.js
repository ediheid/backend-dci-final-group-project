import { createUser, userLogin, verifyUser, updateUser, deleteUser } from "./user.controllers.js";
import express from "express";
import { registerValidator, loginValidator} from '../../middleware/validators.js'

const router = express.Router();

router.post("/", registerValidator(["email","firstname", "lastname", "password"]), createUser); 
router.get("/:userId", loginValidator(["email", "password"]), userLogin);
router.get("/verify-email/:userId/:token", verifyUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router;
