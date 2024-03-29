const emailAPI = require('@sendgrid/mail');
const Client = require("../Models/ClientModel");
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

function NewCheckIn(email,name,date,time) {
    emailAPI.setApiKey(process.env.SENDGRID_API_KEY)

    emailAPI.send({
        to: {
            email: email,
            name: name
        },
        from:{
            email: process.env.APP_EMAIL
        },
        templateId: "d-1cab852821c54c16b9a9383f01561c5f",
        dynamicTemplateData: {
            name: name,
            Date: date,
            Time: time,
        }
    }).then(() => {
        console.log("Email Sent")
    })
}

async function CatchUpFeedback(clientID, rating, notes) {

    let client = await Client.findOne({
        where: {
            ClientID: clientID
        }
    });
    let overAllRating = "";

    if(rating == 0){
        overAllRating = "Not Good - Work More work Needs Done";
    }else if(rating == 1){
        overAllRating = "Average - Push a little Harder";
    }else{
        overAllRating = "Excellent - Keep Up the Good work";
    }

    emailAPI.setApiKey(process.env.SENDGRID_API_KEY)

    emailAPI.send({
        to: {
            email: client.Email,
            name: client.Name
        },
        from: {
            email: process.env.APP_EMAIL
        },
        templateId: "d-bd1c0305e3214755b2fd9c74d988ecb7",
        dynamicTemplateData: {
            name: client.Name,
            rating: overAllRating,
            notes: notes,
        }
    }).then(() => {
        console.log("Email Sent")
    })
}

module.exports = {
    NewWorkoutAssignedEmail,
    NewClientRegisterEmail,
    NewCheckIn,
    CatchUpFeedback
}