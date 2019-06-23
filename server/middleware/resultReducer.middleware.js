var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'quizzard.project@gmail.com',
    pass: 'one4allgroup'
  }
});

var mailOptions = {
  from: 'quizzard.project@gmail.com',
  to: 'justusmray@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});