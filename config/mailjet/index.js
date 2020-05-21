// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_SECRET);

exports.SendEmail = function (mail) {
  const msg = {
    to: mail.to,
    from: process.env.SENDGRID_EMAIL,
    templateId: 'd-58d0e9d1cdd7467aa2b02c6b80a0b7ad',
    dynamic_template_data: {
      title: mail.title,
      category: mail.category,
      description: mail.description,
      duedate: `${mail.duedate}`,
      name: ""
    }
  };

  sgMail.send(msg).then(() => console.log(`mail sent`)).catch((err)=> console.log(err.response.body.errors));
}
