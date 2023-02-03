const express = require("express");
const pbController = require('../Controllers/PersonalBestController')


const router = express.Router();

router.get("/Client/:id",pbController.GetLast3PBForClient);


module.exports = router;