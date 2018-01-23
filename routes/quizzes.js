var express = require("express");
var router = express.Router();

const quizzes_controller = require("../controllers/quizzes_controller");

router.get("/", quizzes_controller.quiz_list);

router.post("/create", quizzes_controller.quiz_create);

module.exports = router;