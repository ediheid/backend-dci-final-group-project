import { createUser, userLogin } from "./user.controllers";
import express from "express";

const router = express.Router();

router.post("/", createUser);
router.get("/:userId", userLogin);

export default router;