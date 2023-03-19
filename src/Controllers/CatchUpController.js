const CatchUp = require("../Models/CatchUpModel");
const Client = require("../Models/ClientModel");

const scheduleCatchUp = async (req,res) =>{
    let client = await Client.findOne({
        where : {
            ClientID : req.params.clientId
        }
    });

    if(client.length <= 0){
        return res.status(404).json("Client not Found")
    }
    else{
        let catchUpMeeting = {
            ClientID: req.params.clientId,
            Date: req.body.Date,
            Time: req.body.Time,
        }

        CatchUp.create(catchUpMeeting).then((meetingToAdd) =>
            res.status(201).send(meetingToAdd)).catch((err) => {
            res.status(400).send(err);
        });
    }
}

module.exports = {
    scheduleCatchUp,
}