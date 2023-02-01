const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Exercise = require('./ExerciseModel')

const WorkOut = sequelize.define("WorkOut",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: false,
    },
    ExerciseID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        foreignKey:true,
        references:{
            model: 'Exercise',
            key: 'ExerciseID'
        }
    },
    TrainerWorkoutID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'TrainerWorkouts',
            key: 'id'
        }
    }
},{
    tableName: 'WorkOut',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
WorkOut.hasMany(Exercise,{foreignKey: 'ExerciseID'})

//Exercise.belongsToMany(TrainerWorkout,{through : WorkOut, foreignKey : 'TrainerWorkoutID'})
//WorkOut.hasOne(Exercise,{foreignKey: 'ExerciseID'})
module.exports = WorkOut;