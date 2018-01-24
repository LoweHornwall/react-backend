const { Model } = require("objection");
const objection = require("objection");
var knex = require("../db/knex");

Model.knex(knex);

class BaseModel extends Model {
  static get tableName() {
    return "SomeTableName";
  }

  $beforeInsert() {
    if (this.id) {
      throw new objection.ValidationError({
        id: [{
          message: 'identifier should not be defined before insert',
          keyword: null,
          params: null
        }]
      });
    }      

    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString(); 
  }
}

module.exports = BaseModel;