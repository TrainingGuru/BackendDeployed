const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Clients = require("./ClientModel");

const NutritionHistoryModel = sequelize.define('NutritionHistory',{
    NutritionHistoryID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ClientID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Client',
            key: 'ClientID'
        }
    },
    Date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    CaloriesHit:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},{
    tableName: 'NutritionHistory',
    timestamps: false,
    createdAt: false,
    updatedAt: false
})
NutritionHistoryModel.belongsTo(Clients,{foreignKey: 'ClientID'});
Clients.hasMany(NutritionHistoryModel,{foreignKey: 'ClientID'})
module.exports = NutritionHistoryModel;