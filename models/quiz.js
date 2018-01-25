const BaseModel = require("./base_model");
const objection = require("objection");
const questionLimit = 3;

class Quiz extends BaseModel {
  static get tableName() {
    return "Quiz";
  }
  
  $beforeInsert() {
    super.$beforeInsert();
    this.validateQuestionLimit();

    var promises = [this.validateUniqueName()];
    return Promise.all(promises);
  }

  $beforeUpdate() {
    super.$beforeUpdate();
    this.validateQuestionLimit();
    
    var promises = [this.validateUniqueName()];
    return Promise.all(promises);
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

  validateQuestionLimit() {
    if (this.questions.length > questionLimit) {
      throw new objection.ValidationError({
        questions: [{
          message: 'Quiz should not have more than 3 associated questions',
          keyword: null,
          params: null
        }]
      });      
    }    
  }

  validateUniqueName() {
    return this.constructor.query().select("name").where("name", this.name).first().then(row => {
      if (typeof row === "object" && row.name) {
        throw new objection.ValidationError({
          name: [{
            message: "The name of the Quiz must be unique.",
            keyword: null,
            params: null
          }]
        });
      }
    });
  }
}

module.exports = Quiz;