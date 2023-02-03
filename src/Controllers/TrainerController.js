const Trainer = require("../Models/TrainersModel");
const Client = require("../Models/ClientModel");
const ClientWorkOut = require("../Models/ClientWorkoutModel");
const WorkOuts = require("../Models/TrainerWorkoutsModel");
const { Op, DATE} = require('sequelize');
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

const registerTrainer =  (req, res) => {
//TODO:: Hash Password, Error handling (Catch), Add account to db,
// https://www.promisejs.org/
    let trainer = {
        Name : req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password
    }

    if(trainer.Name === ""  || trainer.Password === "" ||  trainer.Email === ""){
        return res.status(400).json({message : 'Missing information in Body'})
    }else{


        Trainer.create(trainer).then((trainerToAdd) => res.status(201).send(trainerToAdd)).catch((err) => {
            //console.log(err);
            res.status(400).send(err);
        });
    }

    //console.log(req.body);

    // res.status(400);
    // res.end()

    // let trainerFromRepo = Trainer.findOne({where : { Email : req.body.Email}});
    // if(trainerFromRepo != null)
    //     res.status(409).json({message: 'User Email Already Used'});

    
    //return res.status(200).json({message: 'not Used'});
    // res.end()

    // console.log((trainerFromRepo))

    //Check email is not registered
    // Trainer.findOne({where : {
    //     Email: req.body.Email,
    //     }})
    //     .then(userAccount => {
    //         if(userAccount){
    //             return res.status(409).json({message: 'User Email Already Used'})
    //         }
    //         else{
    //             //return Trainer.create(trainer)
    //             res.status(200).json(trainer)
    //         }
    //     })

}
const loginTrainer = async (req, res) => {

    let trainer = await Trainer.findOne({where : {
        Email: req.body.Email,
        }});

    if(!trainer){
        res.status(404).send("No User found")
    }else if(trainer.Password == req.body.Password){
        res.status(200).json({TrainerID : trainer.TrainerID});
    }else{
        res.status(401).send("Incorrect Password")
    }
}

//Just returns Names
const getAllClientsForTrainer = async (req,res) =>{

    let id = req.params.id;

    Client.findAll({
        where : {
            TrainerID : id
        },
        attributes:['ClientID','Name'],
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



module.exports = {
    getAllTrainers,
    registerTrainer,
    loginTrainer,
    getAllClientsForTrainer,
    GetUpcomingWorkOut

}
