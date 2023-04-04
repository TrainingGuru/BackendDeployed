const ClientWeight = require("../Models/WeightModel");
const Client = require("../Models/ClientModel");

const addClientWeight = async (req, res) => {

    let todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let clintWeight = {
        ClientID : req.params.clientId,
        Date : todayDate,
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
const getAllRecordsOfAClientWeight = async (req, res) => {

    let clientWeightRecords = await ClientWeight.findAll({
        where : {
            ClientID : req.params.clientId
        }
    });

    if(clientWeightRecords.length <= 0 || null){
        return res.status(404).json("No Weight Records for this client found")
    }else{
        return res.status(200).json(clientWeightRecords)
    }

}

const getClientCurrentWeight = async (req, res) => {

    let clientWeight = await ClientWeight.findAll({
        where : {
            ClientID : req.params.clientId
        },
        attributes : ['Weight'],
        order: [
            ['Date','DESC'],
        ],
        limit : 1,
    });

    if(clientWeight.length <= 0 || null){
        return res.status(404).json("No Weight Records for this client found")
    }else{
        return res.status(200).json(clientWeight)
    }

}

module.exports = {
    addClientWeight,
    getAllRecordsOfAClientWeight,
    getClientCurrentWeight
}