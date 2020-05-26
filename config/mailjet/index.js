// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const db = require("../../models/");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_SECRET);
const createContestTemplate = 'd-58d0e9d1cdd7467aa2b02c6b80a0b7ad';
const updateContestTemplate = 'd-2ce7c98ce5e147b698e0c0ec35e584bc';

SendEmail = function (mail) {
  const msg = {
    to: mail.to,
    from: process.env.SENDGRID_EMAIL,
    templateId: mail.template,
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

exports.CreateContest = function(contest) {
  db.User.find({}).then(users =>{
    users = users.map(user => { return {"email" : user.email}})
    SendEmail({
        to: users,
        title: contest.title,
        description: contest.description,
        duedate: contest.duedate,
        category: contest.category,
        template: createContestTemplate
    });  
  })
}

exports.UpdateContest = function(contest) {
  db.User.find({}).then(users =>{
    users = users.map(user => { return {"email" : user.email}})
    SendEmail({
        to: users,
        title: contest.title,
        description: contest.description,
        duedate: contest.duedate,
        category: contest.category,
        template: updateContestTemplate
    });  
  })
}