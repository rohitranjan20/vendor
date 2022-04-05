const nodemailer = require("nodemailer");
let testAccount = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: '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', // generated ethereal password
    },
  });

module.exports = transporter;