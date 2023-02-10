const { Sequelize } = require('sequelize');


// const database = new Sequelize('TrainingGuru', 'admin', 'TrainingGuru', {
//     dialect: 'mysql',
//     host: 'traininguru2.cxnpilaou3nh.eu-west-1.rds.amazonaws.com',
//     port: '3306'
//
// });

const database = new Sequelize('TrainingGuru', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: '8889'
});



module.exports = database;

