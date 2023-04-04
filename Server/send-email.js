import nodemailer from 'nodemailer';
import fs from 'fs';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lbp7198@gmail.com',
        pass: 'ihyqoglfiujqkgjw'
    }
});
const reportContents = fs.readFileSync('./test-report.html', 'utf8');

const mailOptions = {
  from: `<karan.shah@silvertouch.com>`,
  to: "lbp7198@gmail.com",
  subject: "Server Test Results",
  html: reportContents
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
