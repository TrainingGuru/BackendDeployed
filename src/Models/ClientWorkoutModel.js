const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Clients = require('./ClientModel');
const TrainerWorkout = require('./TrainerWorkoutsModel');

const ClientWorkout = sequelize.define("ClientWorkout",{
    ClientWorkoutID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ClientID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        //foreignKey:true,
        references:{
            model: 'Client',
            key: 'ClientID'
        }
    },
    TrainerWorkoutID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'TrainerWorkouts',
            key: 'id'
        }
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    Week:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Notes:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    Completed:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    TotalWeightLifted:{
        type: Sequelize.INTEGER,
        allowNull: true,
    }
},{
    tableName: 'ClientWorkout',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

ClientWorkout.belongsTo(Clients,{foreignKey: 'ClientID'}) //Belongs to fixed error of going to wrong client
ClientWorkout.belongsTo(TrainerWorkout,{foreignKey: 'TrainerWorkoutID'})
module.exports = ClientWorkout;