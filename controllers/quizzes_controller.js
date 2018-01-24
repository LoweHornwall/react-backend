const Quiz = require("../models/quiz");
const { transaction } = require("objection");

exports.quiz_create = async function(req, res, next) {
  const graph = req.body;
  const insertedGraph = await transaction(Quiz.knex(), trx => {
    return (
      Quiz.query(trx)
        .allowInsert("[questions]")
        .insertGraph(graph)
        .then((data) => {
          res.json({Success: true, Response: data});
        })
        .catch((err) => {
          res.status(400).json({sucess: false, Error: err.data});
        })
    );
  });
}

exports.quiz_list = async function(req, res) {
  const quiz = await Quiz
    .query()
    .select("name", "category")
    .count("Quiz.id")
    .innerJoin("Question", "Quiz.id", "Question.quiz_id")
    .groupBy("Quiz.id");

    res.json({Success: true, response: quiz});
}

/*
{
  "name": "Sports vol.1",
  "category": "Sports",
  "questions": [
    {
      "question_desc": "Whats your favorite color?",
      "option_1": "Green",
      "option_2": "Red",
      "option_3": "Yellow",
      "correct_answer": "Blue"
    },
    {
      "question_desc": "Whats your bloodtype?",
      "option_1": "A",
      "option_2": "B",
      "option_3": "O",
      "correct_answer": "B-"
    },
    {
      "question_desc": "Where do you live?",
      "option_1": "Stockholm",
      "option_2": "Gothenburg",
      "option_3": "Tokyo",
      "correct_answer": "London"
    }   
  ]
} 


*/