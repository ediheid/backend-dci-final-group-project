import { createUser, userLogin, verifyUser } from "./user.controllers.js";
import express from "express";
import {registerValidator} from '../../middleware/validators.js'
import { check,body } from 'express-validator'

const router = express.Router();

// router.post("/", registerValidator(["email","firstname"]), createUser);
router.post("/", check('email', 'Your email is not valid').not().isEmpty().isLength({min: 5}), createUser);

router.get("/:userId", userLogin);
router.get("/verify-email/:userId/:token", verifyUser)

export default router;
