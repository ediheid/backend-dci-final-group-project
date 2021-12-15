import { check } from 'express-validator'

// app.post(
//     '/user',
//     // username must be an email
//     body('username').isEmail(),
//     // password must be at least 5 chars long
//     body('password').isLength({ min: 5 }),
//     (req, res) => {
//       // Finds the validation errors in this request and wraps them in an object with handy functions
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       User.create({
//         username: req.body.username,
//         password: req.body.password,
//       }).then(user => res.json(user));
//     },
//   );


export const registerValidator = (props) => {
    return [
        check("email")
            // .notEmpty().trim()
            // .withMessage(`Email is required`)
            .isEmail().normalizeEmail()
            .withMessage(`Must be a valid email`)
    ]   
    // let checks = [];
    
    // // "login" --> props = ["username", "password"]
    // // "albums" -> props = ["band", "title", "year"]
    // for (let field of props) {
    //     checks.push(
    //         check(field)
    //         .notEmpty().trim()
    //         .withMessage(`${field} is required`)
    //     )
    // }

    // return checks;
}
