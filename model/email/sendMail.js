import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "faleyeolumide6@gmail.com",
    pass: "kqafrtfmnrfyiivg",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(html, email, subject) {
  // send mail with defined transport object
  await transporter.sendMail({
    from: "hazardiousTech", // sender address
    to: email, // list of receivers
    subject,
    text: "Hello world?", // plain text body
    html,
  });
}

export default sendMail;
