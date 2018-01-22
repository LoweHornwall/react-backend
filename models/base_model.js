const { Model } = require("objection");
var db = require("../db/db");

Model.knex(db);

class BaseModel extends Model {
  static get tableName() {
    return "SomeTableName";
  }
}

module.exports = BaseModel;