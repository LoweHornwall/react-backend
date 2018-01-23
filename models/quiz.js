const BaseModel = require("./base_model");
const objection = require("objection");

class Quiz extends BaseModel {
  static get tableName() {
    return "Quiz";
  }
  
  $beforeInsert(context) {
    super.$beforeInsert();

    if (this.questions.length > 3) {
      throw new objection.ValidationError({
        id: [{
          message: 'Quiz should not have more than 3 associated questions',
          keyword: null,
          params: null
        }]
      });      
    }
  }

  $beforeUpdate(context) {
    super.$beforeUpdate();

  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "category"],

      properties: {
        id: {type: "integer"},
        name: {type: "string", minLength: 1, maxLength: 255},
        category: {type: "string", enum: ["Games", "Sports", "Music", "Other"]},
      }

    }
  }

  static get relationMappings() {
    const Question = require("./question");

    return {
      questions: {
        relation: BaseModel.HasManyRelation,
        modelClass: Question,
        join: {
          from: "Quiz.id",
          to: "Question.quiz_id"
        }
      }
    }
  }
}

module.exports = Quiz;