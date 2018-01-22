const Question = require("../models/question");

exports.question_list = function(req, res) {
  res.json({success: true, tableName: Question.testHi()});
}