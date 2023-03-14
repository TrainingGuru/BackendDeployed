const ClientWeight = require("../Models/WeightModel");

const addClientWeight = async (req, res) => {

    let clintWeight = {
        ClientID : req.params.clientId,
        Date : req.body.Date,
        Weight : req.body.Weight
    }


}