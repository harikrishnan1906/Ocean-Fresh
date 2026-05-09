const { text } = require("express");
const nodemailer = require("nodemailer");

const sendOrderMailStatus = async(email, status, name)=>{
    try{
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const message = {
    from : process.env.EMAIL,
    to : email,
    subject : "Order Status Update",
    text : `Hello ${name}, Your order status is now : ${status} `,
};

await transporter.sendMail(message);
    }
    catch(err){
        console.log(err);
        
    }
}

module.exports = sendOrderMailStatus;