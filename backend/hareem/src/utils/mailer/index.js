/* eslint-disable no-underscore-dangle */
const nodemailer = require('nodemailer');
const template = require('./templates');

const _transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  host: process.env.MAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_AUTH_USER,
    pass: process.env.MAILER_AUTH_PASSWORD,
  },
});

const sendMail = async (mailInfo) => {
  const { subject, to, html } = mailInfo;
  await _transporter.sendMail({
    from: process.env.MAILER_FROM,
    to,
    subject,
    html,
  });

  // 차후 log 찍기
};

module.exports = {
  template,
  sendMail,
};
