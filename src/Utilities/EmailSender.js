const emailAPI = require('@sendgrid/mail');
require('dotenv').config();


function NewWorkoutAssignedEmail(email,name) {
    emailAPI.setApiKey(process.env.SENDGRID_API_KEY)

    emailAPI.send({
        to: {
            email: email,
            name: name
        },
        from:{
            email: process.env.APP_EMAIL
        },
        templateId: "d-0756cdd09be64fefad885cb86d46215d",
        dynamicTemplateData: {
            name: name,
        }
    }).then(() => {
        console.log("Email Sent")
    })
}

module.exports = {
    NewWorkoutAssignedEmail
}