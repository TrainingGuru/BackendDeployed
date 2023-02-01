//const {Sequelize} = require("sequelize");

const Goals = require("../Models/GoalsModel");
const Client = require("../Models/ClientModel");

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

    let goal = {
        ClientID : req.params.clientId,
        Goal : req.body.Goal
    }
    let client = await Client.findOne({where : {
            ClientID : req.params.clientId,
        }});

    if(client == null){
        return res.status(404).json(`Client ${req.params.clientId} Not found`)
    }else{
        if(goal.Goal === "" || goal.Goal == null){
            return res.status(400).json("Missing Goal")
        } else{
            Goals.create(goal).then((goalToAdd) => res.status(201).json(goalToAdd))
                .catch((err) => { res.status(400).send(err);
                });
        }
    }
}

const UpdateGoalForClient = async (req,res) => {
    Goals.findOne({
        where : {
            ClientID : req.params.clientId,
            GoalID : req.params.goalId,
        }
    }).then(goalToUpdate => {
        if(!goalToUpdate){
            res.status(404).json("No Client Goal Found")
        }else{
            goalToUpdate.update({
                Goal: req.body.Goal
            });
            res.status(201).json(goalToUpdate);
        }
    })

}

const DeleteGoalForClient = async (req,res) => {
    Goals.findOne({
        where : {
            ClientID : req.params.clientId,
            GoalID : req.params.goalId,
        }
    }).then(goalToDelete => {
        if(!goalToDelete){
            res.status(404).json("No Client Workout Found")
        }else{
            goalToDelete.destroy();
            res.status(204);
        }
    })

}



module.exports = {

    getAllGoalsForClient,
    CreateGoalForClient,
    UpdateGoalForClient,
    DeleteGoalForClient
}