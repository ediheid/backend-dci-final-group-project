import { check } from 'express-validator'

export const registerValidator = (props) => {
    return [
        check("email")
            .notEmpty().trim()
            .withMessage('Email is required')
            .isEmail().normalizeEmail()
            .withMessage('Should be a valid email')
            .isLength({max:50})
            .withMessage('Email should not be longer than 50 charachters'),
        check("firstname")
            .notEmpty().trim()
            .withMessage('First name is required')
            .isAlpha()
            .withMessage('First name should only include letters or spaces')
            .isLength({max:30})
            .withMessage('First name should not be longer than 30 charachters'),
        check("lastname")
            .notEmpty().trim()
            .withMessage('Last name is required')
            .isAlpha()
            .withMessage('Last name should only include letters or spaces')
            .isLength({max:30})
            .withMessage('Last name should not be longer than 30 charachters'),
        check("password")
            .notEmpty().trim()
            .withMessage('Password is required')
            .isLength({min:8, max:16})
            .withMessage('Password should be between 8 to 16 characters')
            .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()\-__+.])(?=.*[0-9])(?=.*[a-z]).{8,}$/, "i")
            .withMessage('Password should be combination of at least one uppercase, one lower case, one special character and one number'),
        check("confirmedPassword")
            .notEmpty().trim()
            .withMessage('Confirm password is required.')
            .isLength({min:8, max:16})
            .withMessage('Confirm password should be between 8 to 16 characters')
            .matches('password')
            .withMessage('Passwords should match.')
    ]   
}

export const loginValidator = (props) => {
    return [
        check("email")
            .notEmpty().trim()
            .withMessage('Email is required')
            .isEmail().normalizeEmail()
            .withMessage('Should be a valid email')
            .isLength({max:50})
            .withMessage('Email should not be longer than 50 charachters'),
        check("password")
            .notEmpty().trim()
            .withMessage('Password is required')
            .isLength({min:8, max:16})
            .withMessage('Password should be between 8 to 16 characters')
            .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()\-__+.])(?=.*[0-9])(?=.*[a-z]).{8,}$/, "i")
            .withMessage('Password should be combination of at least one uppercase, one lower case, one special character and one number'),
    ]
}

export const searchValidator = (props) => {
    return [
        check("search")
            .notEmpty().trim()
            .withMessage('Please input a search keyword')
            .isLength({max:50})
            .withMessage('Search should be not longer as 50 characters')
            .isAlpha({ignore:'\s-\'.'}) //TODO test if the space, period, hyphen and apostrophe are accepted
            .withMessage('Search should only include letters or spaces')
    ]
}