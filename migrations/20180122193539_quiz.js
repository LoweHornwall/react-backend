
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("quizzes", function(table) {
        table.increments("id").primary();
        table.string("name");
        table.enu("category", ["Games", "Sports", "Music", "Other"]);
        table.timestamps();
    }),

    knex.schema.createTable("questions", function(table) {
      table.increments("id").primary();
      table.string("question_desc");
      table.string("option_1");
      table.string("option_2");
      table.string("option_3");
      table.string("option_4");
      table.string("correct_answer");
      table.integer("quiz_id").references("id").inTable("quizzes")
      table.timestamps();
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("quizzes"),
    knex.schema.dropTable("questions")
  ]);
};
