const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

  // This code would connect to SMTP server
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const opts = {
    from: 'Harry Nguyen <quanghuy871dev@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(opts);
};

module.exports = sendEmail;