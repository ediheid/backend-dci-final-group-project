import { createUser, userLogin, verifyUser } from "./user.controllers.js";
import express from "express";

const router = express.Router();

router.post("/", createUser);
router.get("/:userId", userLogin);
router.get("/verify-email/:userId", verifyUser)

export default router;
