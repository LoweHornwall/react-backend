const { Model } = require("objection");
var db = require("../db");

Model.knex(db);

class Quiz extends Model {

}

module.exports = Quiz;