var express = require("express");
var router = express.Router();

const questions_controller = require("../controllers/questions_controller");

router.get("/", questions_controller.question_list);

router.post("/create", questions_controller.question_create);

module.exports = router;