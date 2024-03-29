const PORT = 8080

const express = require('express')
const app = express()
const database = require("./Config/DatabaseConfig.js");
const cors = require("cors");

//routes
const trainerRoute = require("./Routes/Trainer.js");
const clientRoute = require("./Routes/Client.js");
const workoutRoute = require("./Routes/WorkOuts.js");
const trainerWorkoutRoute = require("./Routes/TrainerWorkouts");
const goalRoute = require("./Routes/Goals.js");
const pbRoute = require("./Routes/PersonalBest.js");
const nutritionRoute = require("./Routes/Nutrition.js");
const clientWeightRoute = require("./Routes/ClientWeight");
const catchUpRoute = require("./Routes/CatchUp");

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
app.use("/Trainer",trainerWorkoutRoute);
app.use("/Client",workoutRoute);
app.use("/Goals",goalRoute);
app.use("/PB",pbRoute);
app.use("/Nutrition",nutritionRoute);
app.use("/ClientWeight",clientWeightRoute);
app.use("/CatchUp",catchUpRoute);
app.use(cors());

app.get('/Sync', function(req, res) {
    database.sync({ force: false })
        .then(() => {
            console.log('re-sync done!')
            return res.status(200).json("re-sync done!")
        })
});

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
app.listen(PORT,() => console.log('Server listening on localhost: '+PORT))