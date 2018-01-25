const BaseModel = require("./base_model")

class Question extends BaseModel {
  static get tableName() {
    return "Question";
  }

  $beforeInsert() {
    super.$beforeInsert();
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["question_desc", "option_1", "option_2", "option_3", "correct_answer", "quiz_id"],

      properties: {
        id: {type: "integer"},
        question_desc: {type: "string", minLength: 1, maxLength: 255},
        option_1: {type: "string", minLength: 1, maxLength: 255},
        option_2: {type: "string", minLength: 1, maxLength: 255},
        option_3: {type: "string", minLength: 1, maxLength: 255},
        correct_answer: {type: "string", minLength: 1, maxLength: 255},
        quiz_id: {type: "integer"}
      }
    }
  }

  static get relationalMappings() { 
    const Quiz = require("./quiz");

    return {
      quiz: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: "Question.quiz_id",
          to: "Quiz.id"
        }
      }
    }
  }
}

module.exports = Question;