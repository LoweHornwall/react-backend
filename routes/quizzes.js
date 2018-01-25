var express = require("express");
var router = express.Router();

const quizzes_controller = require("../controllers/quizzes_controller");

router.get("/page/:page", quizzes_controller.quiz_list);

router.get("/show/:quiz_name", quizzes_controller.quiz_show);

router.post("/create", quizzes_controller.quiz_create);

module.exports = router;