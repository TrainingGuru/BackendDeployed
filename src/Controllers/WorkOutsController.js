const {Sequelize} = require("sequelize");

const ClientWorkOut = require("../Models/ClientWorkoutModel");
const WorkOuts = require("../Models/TrainerWorkoutsModel");
const WorkOut = require("../Models/WorkOutModel");
const Exercises = require("../Models/ExerciseModel");
const Client = require("../Models/ClientModel");




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


const GetWorkOutDetails = async (req,res) => {

    await WorkOut.findAll({

        where : {
            TrainerWorkoutID : req.params.id
        },
        attributes : ['TrainerWorkoutID'],

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

//GetWorkoutsForWeek() holds ClientWorkoutID which can be used to update
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
                Completed : 1
            });
            res.status(201).json("Workout Completed");
        }

    })
}
//get next 3 upcoming workouts for trainer with any client
const GetUpcomingWorkOut = async (req,res) =>{

    let upcomingWorkouts = await ClientWorkOut.findAll({
        limit : 3, order :[['Date','DESC']],
        attributes : ['Date'],

        include: {
            model : Client,
            attributes : ['Name']
        },

        include:{
            model : WorkOuts,
            where : {TrainerID : 1},
            attributes : ['WorkoutName']
        }
    });

    if(upcomingWorkouts <= 0){
        return res.status(404).json("No upcoming Workouts")
    }else{
        return res.status(200).json(upcomingWorkouts)
    }

}
//Use able Methods in

module.exports = {

    WorkOutWeeks,
    GetWorkOutsForWeek,
    GetWorkOutDetails,
    CompleteAWorkOut,
    GetUpcomingWorkOut,
    
}