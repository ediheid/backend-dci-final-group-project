import { createUser, userLogin, verifyUser, updateUser, deleteUser } from "./user.controllers.js";
import express from "express";
<<<<<<< HEAD
import { registerValidator } from "../../middleware/validators.js";

const router = express.Router();

router.post(
  "/",
  registerValidator(["email", "firstname", "lastname", "password"]),
  createUser
);
router.post("/login", userLogin);
router.get("/verify-email/:userId/:token", verifyUser);

// router.get("/user-signed-up/")
=======
import { registerValidator, loginValidator} from '../../middleware/validators.js'

const router = express.Router();

router.post("/", registerValidator(["email","firstname", "lastname", "password"]), createUser); 
router.get("/:userId", loginValidator(["email", "password"]), userLogin);
router.get("/verify-email/:userId/:token", verifyUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
>>>>>>> eae171afad7a0bc9b3155663a44673fe63183bc1

export default router;
