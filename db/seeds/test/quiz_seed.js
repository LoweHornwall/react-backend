
exports.seed = function(knex, Promise) {
  return knex("Question").del()
    .then(() => knex("Quiz").del())
    .then(() => {
      return knex('Quiz').insert([
        {id: 1, name: 'Games vol.1', category: "Games", created_at: new Date().toISOString()},
        {id: 2, name: 'Games vol.2', category: "Games", created_at: new Date().toISOString()},
        {id: 3, name: 'Sports vol.1', category: "Sports", created_at: new Date().toISOString()}
      ]);
    })
    .then(() => {
      return knex("Question").insert([
        {
          id: 1,
          question_desc: "Whats your favorite color?",
          option_1: "Green",
          option_2: "Red",
          option_3: "Yellow",
          correct_answer: "Blue",
          quiz_id: 1, 
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          question_desc: "Whats your bloodtype?",
          option_1: "A",
          option_2: "B",
          option_3: "O",
          correct_answer: "B-",
          quiz_id: 1, 
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          question_desc: "Where do you live?",
          option_1: "Stockholm",
          option_2: "Gothenburg",
          option_3: "Tokyo",
          correct_answer: "London",
          quiz_id: 2,
          created_at: new Date().toISOString()
        }   
      ]);
    });  
};