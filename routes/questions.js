var express = require("express");
var router = express.Router();

const questions_controller = require("../controllers/questions_controller")

router.get("/", function(req, res, next) {
  res.json([
    {question: 'Whats your height?', options: ['160 cm', '170 cm', '175 cm', '180 cm'], correct: '160 cm'},
    {question: 'Whats your favorite color?', options: ['Blue', 'Red', 'Green', 'white'], correct: 'Red'},
    {question: 'Whats your blood type', options: [ 'A', 'B', 'O', 'A-'], correct: 'A-'},
    {question: 'Where do you live?', options: [ 'Stockholm', 'Malmö', 'Norrköping', 'Göteborg'], correct: 'Stockholm'}
  ]);
});

router.get("/new", questions_controller.question_list);

module.exports = router;