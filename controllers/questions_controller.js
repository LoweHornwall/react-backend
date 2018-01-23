const Question = require("../models/question");
const objection = require("objection");

exports.question_list = async function(req, res) {
  const body = req.body;

  const new_question = await Question
    .query()
    .insert({
      question_desc: body.question_desc,
      option_1: body.option_1,
      option_2: body.option_2,
      option_3: body.option_3,
      option_4: body.option_4,
      correct_answer: body.correct_answer
    })
    .then((data) => {
      res.json({response: data});
    })
    .catch((err) => {
      res.json({error: err});
    });
}

// ["question_desc", "option_1", "option_2", "option_3", "option_4", "correct_answer", "quiz_id"]