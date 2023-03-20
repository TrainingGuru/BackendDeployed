const CatchUp = require("../Models/CatchUpModel");
const Client = require("../Models/ClientModel");
const SendEmail = require("../Utilities/EmailSender");

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
        }
        SendEmail.NewCheckIn(client.Email,client.Name,req.body.Date,req.body.Time);
        CatchUp.create(catchUpMeeting).then((meetingToAdd) =>
            res.status(201).send(meetingToAdd)).catch((err) => {
            res.status(400).send(err);
        });
    }
}

const submitCatchUp = async (req, res) => {

    CatchUp.findOne({
        where: {
            id : req.params.catchUpID
        }
    }).then(recordToUpdate => {
        if(!recordToUpdate)
            res.status(404).json("No Catchup Meeting Found")

       else{
            recordToUpdate.update({
                Notes : req.body.Notes,
                Rating : req.body.Rating
            });
            res.status(201).json("CatchUp Submitted");
        }

    })
}

module.exports = {
    scheduleCatchUp,
    submitCatchUp
}