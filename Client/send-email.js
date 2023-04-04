const nodemailer = require('nodemailer');
const fs = require('fs');
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
  to: "factspert7@gmail.com",
  subject: "Client Test Results",
  html: reportContents
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
