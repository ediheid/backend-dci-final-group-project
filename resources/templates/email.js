import dotenv from "dotenv";
dotenv.config();

const template = (userId) => `<h1>Test<h1/>
<a href="${process.env.HOST_URL + '/user/verify-email/' + userId}">Please click here to verify your email</a>`


export default template;