const {Sequelize} = require("sequelize");

const ClientWorkOut = require("../Models/ClientWorkoutModel");
const WorkOuts = require("../Models/TrainerWorkoutsModel");
const WorkOut = require("../Models/WorkOutModel");
const Exercises = require("../Models/ExerciseModel");
const Client = require("../Models/ClientModel");
const SendEmail = require("../Utilities/EmailSender");
const Utils = require("../Utilities/Utils");
const Goals = require("../Models/GoalsModel");
//const Console = require("console");


const WorkOutWeeks = async (req,res) => {

    await ClientWorkOut.findAll({
        where : {
            ClientID : req.params.id
        },
        attributes:[
            Sequelize.fn('DISTINCT',Sequelize.col('Week')),'Week']
    }).then(function (weekList){
        if(weekList.length <= 0){
            res.status(404).json("No Workouts Found");
        }else{
            res.status(200).json(weekList);
        }
    });
}
//GetWorkoutsForWeek() holds ClientWorkoutID which can be used to update
//returns all workouts for a client for certain week
const GetWorkOutsForWeek = async (req,res) => {

    await ClientWorkOut.findAll({
        where : {
            ClientID : req.params.id,
            Week : req.params.wk
        },
        include: [
            {model: WorkOuts}
        ]
    }).then(function (List){
        if(List.length <= 0){
            res.status(404).json("No Workouts Found");
        }else{
            res.status(200).json(List);
        }
    });
}

const GetAllWorkOutsForClient = async (req,res) => {

    await ClientWorkOut.findAll({
        where : {
            ClientID : req.params.id
        },
        attributes : ['ClientWorkoutID','Date','Notes','Completed','Week'],
        include: [
            {
                model: WorkOuts,
                attributes : ['id','WorkoutName']
            }
        ]
    }).then(function (List){
        if(List.length <= 0){
            res.status(404).json("No Workouts Found");
        }else{
            res.status(200).json(List);
        }
    });
}


const GetWorkOutDetails = async (req,res) => {

    await WorkOut.findAll({

        where : {
            TrainerWorkoutID : req.params.id
        },
        attributes : ['TrainerWorkoutID','Sets','Reps'],

        include:{
            model: Exercises,
            attributes: {exclude : ['ExerciseID']}
        }

    }).then(function (Workout){
        if(Workout.length <= 0){
            res.status(404).json("No Workout Found");
        }else{
            res.status(200).json(Workout);
        }
    });

}


const CompleteAWorkOut = async (req,res) =>{

    ClientWorkOut.findOne({
        where: {
            ClientWorkoutID : req.params.id
        }
    }).then(recordToUpdate => {
        if(!recordToUpdate)
            res.status(404).json("No Client Workout Found")

        if(recordToUpdate.Completed){
            res.status(400).json("Workout Already Completed");
        }else{
            recordToUpdate.update({
                Notes : req.body.Notes,
                Completed : 1,
                TotalWeightLifted: req.body.TotalWeightLifted

            });
            res.status(201).json("Workout Completed");
        }

    })
}

const AssignClientAWorkout = async (req,res) =>
{

    let client = await Client.findOne( {
        where : {
            ClientID : req.params.id
        }
    });

    if(client == null ){
        return res.status(404).json("No client found")
    }else{
        let AssignWorkout = {
            ClientID : req.params.id,
            TrainerWorkoutID: req.body.TrainerWorkoutID,
            Date: req.body.Date,
            Week: req.body.Week,
            Completed : false
        }
        // Send Email
        SendEmail.NewWorkoutAssignedEmail(client.Email,client.Name)
        ClientWorkOut.create(AssignWorkout).then((AssignedWorkout) => res.status(201).send(AssignedWorkout)).catch((err) => {
            res.status(400).send(err);
        });
    }
}

//get all workouts belonging to one trainer
const getAllWorksForTrainer = async (req,res) =>
{
    let trainerWorkouts = await WorkOuts.findAll({
        where : {
            TrainerID : req.params.id
        },
        attributes : ['id','WorkoutName'],
    });
    if(trainerWorkouts.length <= 0){
        res.status(404).json("Trainer Has no Saved workouts")
    }else{
        res.status(200).json(trainerWorkouts)
    }
}

//passes client workout id
const getNotesForOneClientWorkout = async (req,res) =>
{
    let Note = await ClientWorkOut.findOne({
        where :  {
            ClientWorkoutID : req.params.id
        },
        attributes : ['Notes']
    })

    if(Note.length <= 0 || null){
        return res.status(404).json("No workout Found")
    }else{
        return res.status(200).json(Note)
    }
}

const CreateAWorkout = async (req,res) => {

    let newWorkout = await WorkOuts.create({
        TrainerID : req.body.TrainerID,
        WorkoutName : req.body.WorkoutName
    })

    if(newWorkout != null){
        Utils.AddExercises(newWorkout.id,req.body.Exercises);
        return res.status(200).json(newWorkout)
    }else{
        return res.status(400).json("Error Couldnt Create Workout")
    }
}

const TotalWeightLifted = async (req,res) => {

    let TotalWeight = await ClientWorkOut.findAll({
        where : {
            ClientID: req.params.id,
            Week : req.params.wk
        },
        attributes : [[Sequelize.fn('sum',Sequelize.col('TotalWeightLifted')),'Total']]
    })

    if(TotalWeight.length <=0 || TotalWeight == null){
        return res.status(404).json("No Weight Found")
    }else{
        return res.status(200).json(TotalWeight)
    }
}

const DeleteWorkout = async (req, res) => {
    ClientWorkOut.findOne({
        where : {
            ClientWorkoutID : req.params.id,
        }
    }).then(workoutToDelete => {
        if(!workoutToDelete){
            res.status(404).json("No Client Workout Found")
        }else{
            workoutToDelete.destroy();
            return res.status(204);
        }
    })
}



module.exports = {

    WorkOutWeeks,
    GetWorkOutsForWeek,
    GetWorkOutDetails,
    CompleteAWorkOut,
    GetAllWorkOutsForClient,
    AssignClientAWorkout,
    getAllWorksForTrainer,
    getNotesForOneClientWorkout,
    CreateAWorkout,
    TotalWeightLifted,
    DeleteWorkout
}
