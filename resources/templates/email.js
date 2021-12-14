import dotenv from "dotenv";
dotenv.config();

const emailTemplate = (userId, firstname, verificationToken) => `<h1>Please verify your email<h1/>
<p>Hey ${firstname},</p>
<p>you have just created a new User-Account at FreshBnB. Please verify your account by clicking the following link:</p>
<a href="${process.env.HOST_URL + '/user/verify-email/' + userId + '/' + verificationToken}">Please click here to verify your email</a>

<p>If you haven't created this account, please delete this email and don't click on the above link.</p>`

export default emailTemplate;