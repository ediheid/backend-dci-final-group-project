import { check } from 'express-validator'

export const registerValidator = (props) => {
    return [
        check("email")
            .notEmpty().trim()
            .withMessage('Email is required')
            .isEmail().normalizeEmail()
            .withMessage('Should be a valid email')
            .isLength({max:50})
            .withMessage('Email should not be longer than 50 characters'),
        check("firstname")
            .notEmpty().trim()
            .withMessage('First name is required')
            .isAlpha()
            .withMessage('First name should only include letters or spaces')
            .isLength({max:30})
            .withMessage('First name should not be longer than 30 characters'),
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
            // .matches("password")
            // .withMessage('Passwords should match.')
            // .custom((value, { req }) => {
            //     if (value !== req.body.password) {
            //     throw new Error('Password Confirmation does not match password');
            //     }
            //     return true;
            //     })
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

export const locationFormValidator = (props) => {
    return [
        check("locationData.address")
            .notEmpty().trim()
            .withMessage('Please insert a address.')
            .matches(/^([a-zäöüß\s\d.,-]+?)\s*([\d\s]+(?:\s?[-|+/]\s?\d+)?\s*[a-z]?)?\s*(\d{5})\s*(.+)?$/i)
            .withMessage('Please insert a real address in the following formate: "street streetNo. & city"'),
        check("locationData.title")
            .notEmpty().trim()
            .withMessage('Please enter a descriptive title for your property')
            .isLength({min: 20, max: 100})
            .withMessage('Please enter a descriptive title that contains 20 - 100 characters.'),
        check("description")
            .notEmpty().trim()
            .withMessage('Please enter a description of your property that provides your guests a good imagination of your offered property.')
            .isLength({min: 800, max: 2000})
            .withMessage('Your description should be between 800 - 2000 characters long.'),
        check("regionalDescription")
            .notEmpty().trim()
            .withMessage('Please enter a description of the area in which your property is located.')
            .isLength({min: 400, max: 2000})
            .withMessage('The description of the local circumstances should be between 400 - 2000 characters long.'),
        check("houseRules")
            .notEmpty().trim()
            .withMessage('Please enter important rules for checkin, checkout or general rules your guest have to fullfill.')
            .isLength({min: 200, max: 2000})
            .withMessage('The description of your property rules should be between 200 - 2000 characters long.'),
    ]
}