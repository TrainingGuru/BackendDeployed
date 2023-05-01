const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Clients = require("./ClientModel");

const Weight = sequelize.define("Weight",{
    id:{
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
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Weight:{
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
},{
    tableName: 'ClientsWeight',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

Weight.hasOne(Clients,{foreignKey: 'ClientID'});
Clients.hasMany(Weight,{foreignKey: 'ClientID'});

module.exports = Weight;