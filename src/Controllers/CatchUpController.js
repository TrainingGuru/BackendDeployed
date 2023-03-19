const CatchUp = require("../Models/CatchUpModel");
const Client = require("../Models/ClientModel");

const getAllClients = async (req,res) =>{
    let clients = await CatchUp.findAll()
    if(clients.length < 1){
        res.status(404)
        res.end()
    }
    else{
        res.status(200).send(clients)
        res.end();
    }
}

module.exports = {
    getAllClients,
}