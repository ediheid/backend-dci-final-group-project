import { createUser, userLogin, verifyUser } from "./user.controllers.js";
import express from "express";
import { registerValidator } from "../../middleware/validators.js";

const router = express.Router();

router.post(
  "/",
  registerValidator(["email", "firstname", "lastname", "password"]),
  createUser
);
router.post("/login", userLogin);
router.get("/verify-email/:userId/:token", verifyUser);

export default router;
