const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Trainer = require("./TrainersModel");
const Nutrition = require("./NutritionModel");

const Client = sequelize.define('Client',{
        ClientID:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        TrainerID:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model: 'Trainer',
                key: 'TrainerID'
            }
        },
        Name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Email:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        Password:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        NutritionID:{
            type: Sequelize.INTEGER,
            allowNull: true,
            foreignKey:true,
            references:{
                model: 'Nutrition',
                key: 'NutritionID'
            }
        }
    },
    {
        tableName: 'Client',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

Client.belongsTo(Trainer,{foreignKey: 'TrainerID'});
Client.hasOne(Nutrition, {foreignKey: 'NutritionID'})
module.exports = Client;