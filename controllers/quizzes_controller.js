const Quiz = require("../models/quiz");
const { transaction } = require("objection");

exports.quiz_create = async (req, res, next) => {
  const graph = req.body;
  const insertedGraph = await transaction(Quiz.knex(), trx => {
    return (
      Quiz.query(trx)
        .allowInsert("[questions]")
        .insertGraph(graph)
        .then(data => {res.json({Success: true, Response: data})})
        .catch(next)  
    );
  });
}

exports.quiz_list = async (req, res, next) => {
  const quizzes = await Quiz
    .query()
    .select("name", "category", "Quiz.created_at")
    .count("Question.id") 
    .fullOuterJoin("Question", "Quiz.id", "Question.quiz_id")
    .groupBy("Quiz.id")
    .orderBy("category")
    .page(req.params.page - 1, 2)
    .then(data => {res.json({Success: true, response: data})})
    .catch(next);
}

exports.quiz_show = async (req, res, next) => {
  console.log(req.params.quiz_name);
  const quiz = await Quiz
    .query()
    .where("name", "=", req.params.quiz_name)
    .eager("questions")
    .then(data => {res.json({Success: true, response: data})})
    .catch(next);
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