const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Clients = require('./ClientModel');

const Goal = sequelize.define('Goals',{
    GoalID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ClientID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: 'Client',
            key: 'ClientID'
        }
    },
    Goal:{
        type: Sequelize.STRING(100),
        allowNull: false,
    }
},{
    tableName: 'Goals',
    timestamps: false,
    createdAt: false,
    updatedAt: false
})
Goal.belongsTo(Clients,{foreignKey: 'ClientID'})
Clients.hasMany(Goal,{foreignKey: 'ClientID'})
module.exports = Goal;