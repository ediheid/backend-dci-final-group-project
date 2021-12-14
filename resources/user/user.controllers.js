import { User } from "./user.model.js";
// import Token from models
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createErrors from "http-errors";
import nodemailer from "nodemailer";
import emailtemplate from "../templates/email.js";
import dotenv from "dotenv";
dotenv.config();

console.log("Pass:",process.env.SERVICE)
//* Create a new User on Signup Page
export const createUser = async (req, res, next) => {
    // console.log(req.body)
    try {
        // Search if a user with this email already exists
        // const existingUser = await User.findOne({ email: req.body.email })

        const existingUser = false;

        console.log(existingUser)
        // If there is no user with the same email adress, create a new user
        if (!existingUser) {
            // check if given password is identical to the confirmPassword
            if (req.body.password === req.body.confirmedPassword) {
                // create hashed password for backend
                let securePassword = await bcrypt.hash(req.body.password, 12);

                //TODO: Do we have to create a password here? It's better to send the user a temporary password with email confirmation and than change it in the account dashboard???
                // build up new User
                const newUser = new User({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: securePassword
            })
                // save User into database
                await newUser.save()

            // let token;

            //     try {
            //         token = new Token({ userId : userLogin._id, token : crypto.randomBytes(16).toString("hex") })    
            //     } catch (e) {
            //         return next(createErrors(401, "Signup failed - please try again."))
            //     }
            
            //* Send varification mail
            const transporter = nodemailer.createTransport({ 
                host: process.env.HOST, // "smtp.gmail.com"
                service: process.env.SERVICE, // "gmail"
                port: 465, // see Edith's code
                secure: true,
                auth: {
                user: process.env.NODEMAILER_USER, // verfificationfreshbnb@gmail.com
                pass: process.env.PASS  // APP Password from Gmail
            },
            // tls: {
            //     rejectUnauthorized: false
            // }
            })

            const mailOptions = {
                from: process.env.NODEMAILER_USER,
                //TODO: Implement Info from Frontend
                to: req.body.email,     
                subject: "Account verification Link",
                //TODO: Implement firstname and from Frontend
                // text: `Hello,
                // Please verify your account!`
                html: emailtemplate(newUser._id)
            }
            
                await transporter.sendMail(mailOptions)
            
    
                

                // respond with message to successful created User
                res.status(201).json({message: "Your new Account has been created! Please check your email to verify your account!"})
                
                // If password and passwordConfirm conflicts send response to the user 
            } else {
                next(createErrors(406, "Your given and confirmed passwords are missmatching. Please make sure you type in the exact same passwords!"))
                
                // if email already exists 
            }

        } else {
            next(createErrors(401, "User with the same email already exists. Please make sure you didn't already signup."))
        }
    } catch (e) {
        // next(createErrors.InternalServerError())
        console.error(e)
    }
}

//*============================================================================================================================================

export const verifyUser = async (req, res, next) => {
    console.log("User verified the email!", req.params.userId)
    const existingUser = await User.findOne

    res.redirect(process.env.FRONTEND_URL + "?message=Your account has been verified")

}

//*========================================================

export const userLogin = async (req, res, next) => {
    try {
        const existingUser = await userLogin.findOne({email: req.body.email})

        if(!existingUser) {
            next(createErrors(401, "User doesn't exist"))
        } else {
            let validPassword = await bcrypt.compare(req.body.password, existingUser.password);

            if(validPassword) {
                let token; 
                
                try {
                    //TODO: lookup expires with logout!!!
                    token = jwt.sign({ userId: existingUser.id }, "XfreshcampingkeyX", { expiresIn: "1h" }) 
                } catch {
                    return next(createErrors(401, "Signup failed - please try again."))
                }

                const response = {
                    _id: existingUser._id,
                    email: existingUser.email
                }

                res.cookie("sessionCookie", token, { httpOnly: true, sameSite: "Strict" });

                res.json(response);
            }
        }
    } catch (e) {
        next(createErrors.InternalServerError())
    }
    
}
