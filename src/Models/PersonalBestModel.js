const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Clients = require("./ClientModel");
const Exercise = require("./ExerciseModel");

const PersonalBest = sequelize.define("PersonalBest",{
    ClientID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Client',
            key: 'ClientID'
        }
    },
    ExerciseID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Exercise',
            key: 'ExerciseID'
        }
    },
    PersonalBest:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    LastPB:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
},{
    tableName: 'PersonalBest',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

PersonalBest.hasOne(Clients,{foreignKey: 'ClientID'});
Clients.hasMany(PersonalBest,{foreignKey: 'ClientID'});
PersonalBest.belongsTo(Exercise,{foreignKey: 'ExerciseID'});

module.exports = PersonalBest;