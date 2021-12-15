import { check } from 'express-validator'

export const registerValidator = (props) => {
    return [
        check("email")
            .notEmpty().trim()
            .withMessage(`Email is required`)
            .isEmail().normalizeEmail()
            .withMessage(`Must be a valid email`),
        check("firstname")
            .notEmpty().trim()
            .withMessage(`First name is required`),
        check("lastname")
            .notEmpty().trim()
            .withMessage(`Last name is required`),
        check("password")
            .notEmpty().trim()
            .withMessage(`Password is required`)
            .isLength({ min: 8 })
            .withMessage(`Password must be at least 8 characters long`)
    ]   
}