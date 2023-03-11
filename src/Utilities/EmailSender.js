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

function NewClientRegisterEmail(email,name,password,trainerName) {
    emailAPI.setApiKey(process.env.SENDGRID_API_KEY)

    emailAPI.send({
        to: {
            email: email,
            name: name
        },
        from:{
            email: process.env.APP_EMAIL
        },
        templateId: "d-43c1bd437e1a4cdb86093faee8fa7ac4",
        dynamicTemplateData: {
            name: name,
            trainer: trainerName,
            email: email,
            password: password
        }
    }).then(() => {
        console.log("Email Sent")
    })
}

module.exports = {
    NewWorkoutAssignedEmail,
    NewClientRegisterEmail
}