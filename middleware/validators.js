import { check, body } from 'express-validator'

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
        body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.address.length === 0) {
                throw new Error('Please insert a address.');
            }
            return true
          }),
        body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.title.length === 0) {
                throw new Error('Please enter a descriptive title for your property');
            }
            return true
          }),
          body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.title.length < 20 || parsedBody.title.length > 100) {
                throw new Error('Please enter a descriptive title that contains 20 - 100 characters.');
            }
            return true
          }),
        body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.description.length === 0) {
                throw new Error('Please enter a description of your property that provides your guests a good imagination of your offered property');
            }
            return true
          }),
          body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.description.length < 800 || parsedBody.description.length > 2000) {
                throw new Error('Your description should be between 800 - 2000 characters long.');
            }
            return true
          }),
          body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.regionalDescription.length === 0) {
                throw new Error('Please enter a description of the area in which your property is located.');
            }
            return true
          }),
          body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.regionalDescription.length < 400 || parsedBody.regionalDescription.length > 2000) {
                throw new Error('The description of the local circumstances should be between 400 - 2000 characters long.');
            }
            return true
          }),
          body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.houseRules.length === 0) {
                throw new Error('Please enter important rules for checkin, checkout or general rules your guest have to fullfill.');
            }
            return true
          }),
          body().custom(value => {
            const parsedBody = JSON.parse(value.locationData);
            if (parsedBody.houseRules.length < 200 || parsedBody.houseRules.length > 2000) {
                throw new Error('The description of your property rules should be between 200 - 2000 characters long.');
            }
            return true
          })
    ]
}