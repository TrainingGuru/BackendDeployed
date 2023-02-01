const PORT = 8080
// const HOSTNAME = '192.168.1.137' // change to yours (Might change daily so needs updated)
const express = require('express')
const app = express()
const database = require("./Config/DatabaseConfig.js");

const trainerRoute = require("./Routes/Trainer.js");
const clientRoute = require("./Routes/Client.js");
const workoutRoute = require("./Routes/WorkOuts.js");
const goalRoute = require("./Routes/Goals.js");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get('/', function(req, res) {
    res.json({message: 'alive'});
});

app.use("/Client",clientRoute);
app.use("/Trainer",trainerRoute);
app.use("/Client",workoutRoute);
app.use("/Goals",goalRoute);




// console.log(`Server running at http://${HOSTNAME}:${PORT}`)
async function testConection(){
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConection();

database.sync({ force: false })
    .then(() => {
        console.log('re-sync done!')
    })
//app.listen(PORT,HOSTNAME)
//if in college use this one - but mobile work with
console.log(`Server running at http://localhost:${PORT}`)
app.listen(PORT,() => console.log('Server listening on localhost: '+PORT))