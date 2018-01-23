
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("Quiz", function(table) {
        table.increments("id").primary();
        table.string("name");
        table.enu("category", ["Games", "Sports", "Music", "Other"]);
        table.timestamps();
    }),

    knex.schema.createTable("Question", function(table) {
      table.increments("id").primary();
      table.string("question_desc");
      table.string("option_1");
      table.string("option_2");
      table.string("option_3");
      table.string("option_4");
      table.string("correct_answer");
      table.timestamps();
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("Question"),
    knex.schema.dropTable("Quiz")
  ]);
};
