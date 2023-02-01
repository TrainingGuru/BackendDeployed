const {Sequelize} = require("sequelize");

const Goals = require("../Models/GoalsModel");

const getAllGoalsForClient = async (req,res) =>{
    let goals = await Goals.findAll({
        where : {
            ClientID : req.params.clientId
        }
    })
    if(goals.length <=0){
        res.status(404).json(`Client ${req.params.clientId} has no Saved Goals`)
        res.end()
    }
    else{
        res.status(200).json(goals)
    }
}

const CreateGoalForClient = async (req,res) => {
//TODO:IMPLEMENT ENDPOINT
}

const UpdateGoalForClient = async (req,res) => {
//TODO:IMPLEMENT ENDPOINT
}

const DeleteGoalForClient = async (req,res) => {
//TODO:IMPLEMENT ENDPOINT
}



module.exports = {

    getAllGoalsForClient

}