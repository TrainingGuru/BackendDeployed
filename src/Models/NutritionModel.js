const { Sequelize } = require('sequelize');
const sequelize = require('../Config/DatabaseConfig');

const Nutrition = sequelize.define('Nutrition',{
        NutritionID:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        TotalCalories:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        TotalFats:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        TotalProtein:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        TotalCarbohydrates:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        CaloriesIntake:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        FatsIntake:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        ProteinIntake:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        CarbohydratesIntake:{
            type: Sequelize.INTEGER,
            allowNull: true,
        },

    },
    {
        tableName: 'Nutrition',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

// Nutrition.belongsTo(Client, {foreignKey: 'NutritionID'})
module.exports = Nutrition;
