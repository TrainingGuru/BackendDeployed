const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const TrainerWorkOuts = require("./TrainerWorkoutsModel");
const Workout = require("./WorkOutModel");
const Clients = require("./ClientModel");
const TrainerWorkout = require("./TrainerWorkoutsModel");

const Exercise = sequelize.define("Exercise",{
    ExerciseID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Type:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Sets:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Reps:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Instructions:{
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    tableName: 'Exercise',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

//Exercise.belongsTo(Workout)

//Exercise.belongsToMany(TrainerWorkOuts, {through: 'WorkOut', foreignKey: 'ExerciseID'});

module.exports = Exercise;