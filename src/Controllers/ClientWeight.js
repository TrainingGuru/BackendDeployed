const ClientWeight = require("../Models/WeightModel");
const Client = require("../Models/ClientModel");
const Goals = require("../Models/GoalsModel");

const addClientWeight = async (req, res) => {

    let clintWeight = {
        ClientID : req.params.clientId,
        Date : req.body.Date,
        Weight : req.body.Weight
    }
    let client = await Client.findOne({where : {
            ClientID : req.params.clientId,
        }});

    if(client == null){
        return res.status(404).json(`Client ${req.params.clientId} Not found`)
    }else{
        if(clintWeight.Weight === "" || clintWeight.Weight == null || clintWeight.Date === "" || clintWeight.Date == null){
            return res.status(400).json("Missing Information in the body")
        } else{
            ClientWeight.create(clintWeight).then((clintWeightToAdd) => res.status(201).json(clintWeightToAdd))
                .catch((err) => { res.status(400).send(err);
                });
        }
    }
}

module.exports = {
    addClientWeight,
}