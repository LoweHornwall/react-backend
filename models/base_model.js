const { Model } = require("objection");
const objection = require("objection");
var db = require("../db");

Model.knex(db);

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