const express = require("express");
const router = express.Router();
const {setUserScore, getQuestions, getUsersResult, getTestIntro} = 
require("../controllers/reasoningTestController");

router.route("/")
.get(getTestIntro);

router.route("/start")
.get(getQuestions);

router.route("/result")
.get(getUsersResult).post(setUserScore);

module.exports = router;