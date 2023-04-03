const { Sequelize } = require('sequelize');
require('dotenv').config();

//
const database = new Sequelize(process.env.AWS_DB_NAME, process.env.AWS_DB_USERNAME, process.env.AWS_DB_PW, {
    dialect: 'mysql',
    host: process.env.AWS_DB_HOST,
    port: '3306'

});


// const database = new Sequelize(process.env.LOCAL_DB_NAME, process.env.LOCAL_DB_USERNAME, process.env.LOCAL_DB_PW, {
//     dialect: 'mysql',
//     host: process.env.LOCAL_DB_HOST,
//     port: '8889'
// });




module.exports = database;

