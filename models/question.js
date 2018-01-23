const { Model } = require("objection");
var db = require("../db");

Model.knex(db);

class Question extends Model {
  static get tableName() {
    return "Question";
  }

  static testHi() {
    return "hi!";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["question_desc", "option_1", "option_2", "option_3", "option_4", "correct_answer"],

      properties: {
        id: {type: "integer"},
        question_desc: {type: "string", minLength: 1, maxLength: 255},
        option_1: {type: "string", minLength: 1, maxLength: 255},
        option_2: {type: "string", minLength: 1, maxLength: 255},
        option_3: {type: "string", minLength: 1, maxLength: 255},
        option_4: {type: "string", minLength: 1, maxLength: 255},
        correct_answer: {type: "string", minLength: 1, maxLength: 255}
      }
    }
  }
/*
  static get relationalMappings() { 
    const Quiz = require("./quiz");

    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: "Question.quiz_id",
          to: "Quiz.id"
        }
      }
    }
  }
  */
}

module.exports = Question;