
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: "quizzard.project@gmail.com",
    clientId: '541237565616-ogf8f91sudg1m1bdbde13lfn2r1487es.apps.googleusercontent.com',
    clientSecret: 'mSzEJ2oi3fmrRHtOMKPgPjV5',
    refreshToken: '1/RLaDMXi_W-rbmvkB1MGsvdKxtW8kVWJq74JDnIA2Q7M',
    accessToken: 'ya29.Glw1BxBWxIITNWJPT4LsiNOFOo1tKnr87vlANxwPMPwJdk-Aqe6TSlGv-cHiFx_6V1TJicdDdlxACq4C0nVTpSw8Tj8XPZcso-Mn_aIcwUD-yESFkwMviq06I6SGCQ',
    
  }
});






// const forGraded = () => {
//   mailOptions = {

//   }
// }

// const forSorted = () => {
  
// }
const forSurvey = (quizData) => {
  let dataToMap;
  switch(quizData.inputType){
    case 'openEnded': 
      data
    break;

    default : 

      break
  }
    return(
      questionsArray.map(questionObject => {
        return (
          `
          <div>
            <p>${questionObject.questionContent}</p>
          </div>
          `
        )
      })
    )
}








const resultReducer = (req) => {
  return(
    new Promise(  (resolve, reject) => {
      let mailOptions;
      switch(req.body.quizType){
        case 'graded':
            mailOptions = {
              from: 'quizzard.project@gmail.com',
              to: 'justusmray@gmail.com',
              subject: 'Graded quiz',
              html: `<h1>Answers to graded quiz</h1>`
            };
          break;
  
        case 'sorted':
            mailOptions = {
              from: 'quizzard.project@gmail.com',
              to: 'justusmray@gmail.com',
              subject: 'sorted quiz',
              html: `<h1>category you where sorted into</h1>`
            };
            break;
  
        case 'survey':
            mailOptions = {
              from: 'quizzard.project@gmail.com',
              to: 'justusmray@gmail.com',
              subject: 'survey',
              html: `<h1>${forSurvey(req.body.questions)}</h1>`
            };
          break;
  
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          reject('Error')
        } else {
          console.log('Email sent: ' + info.response);
          resolve('Email sent')
        }
      })
    })
  )
  
} 
    
  



module.exports = {resultReducer};