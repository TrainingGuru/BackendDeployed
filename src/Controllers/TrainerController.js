const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');

const Trainer = require("../Models/TrainersModel");
const Client = require("../Models/ClientModel");
const ClientWorkOut = require("../Models/ClientWorkoutModel");
const WorkOuts = require("../Models/TrainerWorkoutsModel");
const CatchUp = require("../Models/CatchUpModel");

//TODO:: VALIDATION in phase two
//GetAllTrainer
const getAllTrainers = async (req,res) =>{
    let trainers = await Trainer.findAll()
    if(trainers.length < 1){
        res.status(404)
        res.end()
    }
    else{
        res.status(200).send(trainers)
        res.end();
    }
}

const registerTrainer = async (req, res) => {
//TODO:: Hash Password, Error handling (Catch), Add account to db,
// https://www.promisejs.org/


    let trainerFromRepo = await Trainer.findOne({where : { Email : req.body.Email}});

    if(trainerFromRepo != null){
        res.status(409).json({message: 'User Email Already Used'});
    }else if(req.body.Name === ""  || req.body.Password === "" ||  req.body.Email === ""){
        return res.status(400).json({message : 'Missing information in Body'})
    }
    else{
        bcrypt.hash(req.body.Password,12, (err, hashedPassword) => {
            if(err){
                console.log('Cannot encrypt');
                return res.status(500).json({message: "Could not hash the password"});
            }
            else if(hashedPassword){
                let trainer = {
                    Name : req.body.Name,
                    Email: req.body.Email,
                    Password: hashedPassword
                }

                Trainer.create(trainer).then((trainerToAdd) => res.status(201).send(trainerToAdd)).catch((err) =>
                {
                    res.status(400).send(err);
                });
            }
        });
    }
}
const loginTrainer = async (req, res) => {

    let trainer = await Trainer.findOne({where : {
        Email: req.body.Email,
        }});

    if(!trainer){
        res.status(404).send("No User found")
    }
    else{
        bcrypt.compare(req.body.Password,trainer.Password, (err, comparePW) => {
            if(err){
                res.status(502).json({message: "error while checking user password"});
            }
            else if( comparePW)
            {
                res.status(200).json({TrainerID : trainer.TrainerID});
            }
            else
            {
            res.status(401).send("Incorrect Password")
            }
        })
    }
}

//Just returns Names and recent rating
const getAllClientsForTrainer = async (req,res) =>{

    let id = req.params.id;

    Client.findAll({
        where : {
            TrainerID : id
        },
        attributes:['ClientID','Name'],
        include : [
            {
                model : CatchUp,
                limit : 1,
                order: [['Date','DESC']],
                attributes : ['Rating']
            }
        ],
    }).then(function (list){
        if(list.length <= 0){
            res.status(404).json("Trainer has No Clients")
        }
        else{
            res.status(200).json(list);
        }
    })
}


//get next 3 upcoming workouts for trainer with any client from today date
const GetUpcomingWorkOut = async (req,res) =>{

    let upcomingWorkouts = await ClientWorkOut.findAll({
        where : {
            Date: {
                [Op.gte] : new Date()
            }
        },
        limit : 3, order :[['Date','ASC']], //DESC
        attributes : ['Date'],
        include: [
            {
                model: Client,
                attributes : ['Name']
            },
            {
                model : WorkOuts,
                where : {TrainerID : req.params.id},
                attributes : ['WorkoutName']
            },
        ]
    });

    if(upcomingWorkouts <= 0){
        return res.status(404).json("No upcoming Workouts")
    }else{
        return res.status(200).json(upcomingWorkouts)
    }

}

const getUpComingMeetingForTrainer = async (req,res) =>{

    let id = req.params.id;

    CatchUp.findAll({
        //attributes:['Date','Time'],
        order: [
            ['Date','ASC'],
            ['Time','ASC']
        ],
        where : {
            Rating : null
        },
        include : [
            {
                model : Client,
                where : {
                    TrainerID : id,

                },
                //attributes:['ClientID','Name']
            }
        ],
    }).then(function (list){
        if(list.length <= 0){
            res.status(404).json("Trainer has No Meetings")
        }
        else{
            res.status(200).json(list);
        }
    })
}



module.exports = {
    getAllTrainers,
    registerTrainer,
    loginTrainer,
    getAllClientsForTrainer,
    GetUpcomingWorkOut,
    getUpComingMeetingForTrainer

}
