'use strict'
const nodemailer = require('nodemailer');

let sendEmail = sendEmailOptions => {

  nodemailer.createTestAccount((err, account) => {

    const tranporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.email',
      auth: {
        user: 'tamit9509@gmail.com',
        pass: '@95akknlvhtdscb'
      }
    })
    tranporter.sendMail({
      from: '"ChatApp Admin" <tamit9509@gmail.com>',
      to: sendEmailOptions.email,
      subject: sendEmailOptions.subject,
      html: sendEmailOptions.html
    }, (err, info) => {
      if (err) {
        return console.error('Email sending error=====>>>>', err);
      } else {
        console.log('message sent successfully.', info);
      }
    });
  });
}

module.exports = {
  sendEmail: sendEmail
}