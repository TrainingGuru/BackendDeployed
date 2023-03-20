const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');
const Clients = require("./ClientModel");

const CatchUp = sequelize.define("CatchUp",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        //primaryKey: false,
    },
    ClientID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        references:{
            model: 'Client',
            key: 'ClientID'
        }
    },
    Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Time:{
        type: Sequelize.TIME,
        allowNull: false
    },
    Notes:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    Rating:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    Week:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },
},{
    tableName: 'ClientCatchUp',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

CatchUp.hasOne(Clients,{foreignKey: 'ClientID'});
Clients.hasMany(CatchUp,{foreignKey: 'ClientID'});

module.exports = CatchUp;