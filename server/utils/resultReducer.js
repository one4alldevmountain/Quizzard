
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
    accessToken: 'ya29.Glw2B4vwOFy7k49VhsOnS7OXpHQyC_HfCCjglO5St4W4URb3cWvFs1dVXgwtB4dfMCPTOGo49z18NjCAWRX0sMjgE80v36IU3glvY8M492stf4sJyvP7AGNE4TrDSA',
    
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
      dataToMap = quizData.openEndedInput;
    break;

    default : 
      var questions = quizData.questions.map ( (question, index) => {

        const answers = question.userAnswers.map( (answer, index) => {
          return (
            `
              <div>
              <p> - ${question.answers[answer].answerContent} </p>
              </div>
            `
          )
        }).join('');
        return(
            `
            <div style={"color" : "red"}>
            <h3> ${index + 1}. ${question.questionContent}</h3>
            
            <h4>User Answer</h4>
            <h5>${answers}</h5>
            <hr/>
            </div>
            `
         )
      }).join('');
      break;
  }
    return(
          `
          <div>
            <h2>Questions</h2>
            <hr/>
              <div>
                ${questions}
              </div>
          </div>
          `
       
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
              html: `<h1>${forSurvey(req.body)}</h1>`
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