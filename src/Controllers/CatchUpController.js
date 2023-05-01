const CatchUp = require("../Models/CatchUpModel");
const Client = require("../Models/ClientModel");
const SendEmail = require("../Utilities/EmailSender");
const Goals = require("../Models/GoalsModel");

const scheduleCatchUp = async (req,res) =>{
    let client = await Client.findOne({
        where : {
            ClientID : req.params.clientId
        }
    });

    if(client == null){
        return res.status(404).json("Client not Found")
    }
    else{
        let catchUpMeeting = {
            ClientID: req.params.clientId,
            Date: req.body.Date,
            Time: req.body.Time,
            Week: req.body.Week
        }
        SendEmail.NewCheckIn(client.Email,client.Name,req.body.Date,req.body.Time);
        CatchUp.create(catchUpMeeting).then((meetingToAdd) =>
            res.status(201).json(meetingToAdd)).catch((err) => {
            res.status(400).send(err);
        });
    }
}
// await CatchUp.findOne({
//     where: {
//         id : req.params.catchUpID
//     }
// }).then(recordToUpdate => {
//
//
//     if(!recordToUpdate)
//         res.status(404).json("No Catchup Meeting Found")
//
//     else{
//         recordToUpdate.update({
//             Notes : req.body.Notes,
//             Rating : req.body.Rating,
//             Week: req.body.Week
//         });
//         SendEmail.CatchUpFeedback(recordToUpdate.ClientID,req.body.Rating,req.body.Notes);
//         console.log(recordToUpdate.ClientID)
//         res.status(201).json("CatchUp Submitted");
//     }
//
// })
const submitCatchUp = async (req, res) => {

    let catchUpMeeting = await CatchUp.findOne({
        where: {
            id : req.params.catchUpID
        }
    })
    let recordToUpdate = {
            Notes : req.body.Notes,
            Rating : req.body.Rating,
            Week: req.body.Week
        }

        if(catchUpMeeting == null || catchUpMeeting.length <=0 ){
            res.status(404).json("No Catchup Meeting Found")
        }else {
            await CatchUp.update({
                Notes : req.body.Notes,
                Rating : req.body.Rating,
                Week: req.body.Week
            }, {
                where : {
                    id : req.params.catchUpID
                }
            });
            SendEmail.CatchUpFeedback(catchUpMeeting.ClientID,req.body.Rating,req.body.Notes);
            console.log(recordToUpdate.ClientID)
            res.status(201).json("CatchUp Submitted");
        }
}

const getCatchUpSummary = async (req,res) =>{

    let summary = await CatchUp.findAll({
        where : {
            ClientID : req.params.id
        },
        order: [
            ['Date','DESC'],
        ],
        attributes : ['Date','Rating','Week']
    });

    if(summary.length <= 0 || summary == null){
        return res.status(404).json("No Summary Of Catch ups Found");
    }else{
        return res.status(200).json(summary);
    }
}

const getCatchUpNotes = async (req,res) =>{

    let summary = await CatchUp.findAll({
        where : {
            ClientID : req.params.id
        },
        order: [
            ['Date','DESC'],
        ],
        attributes : ['Date','Notes','Week']
    });

    if(summary.length <= 0 || summary == null){
        return res.status(404).json("No Summary Of Catch ups Found");
    }else{
        return res.status(200).json(summary);
    }
}

const DeleteCatchup = async (req,res) => {
    CatchUp.findOne({
        where : {
            id : req.params.id,
        }
    }).then(MeetingDelete => {
        if(!MeetingDelete){
            res.status(404).json("No Catchup Meeting Found")
        }else{
            MeetingDelete.destroy();
            res.status(204);
        }
    })

}

module.exports = {
    scheduleCatchUp,
    submitCatchUp,
    getCatchUpSummary,
    getCatchUpNotes,
    DeleteCatchup
}