import React from "react";
import Quiz from "./Quiz";

// Fisher-Yates shuffle
function shuffle(array) {
  for (var i = array.length-1; i >=0; i--) {
    var randomIndex = Math.floor(Math.random()*(i+1));
    var itemAtIndex = array[randomIndex];

    array[randomIndex] = array[i];
    array[i] = itemAtIndex;
  }

  return array;
}

export default (props) => {
  let unorderedQuestions = shuffle(props.results[0].questions);
  let formattedQuestions = unorderedQuestions.map(question => {
    return {
      question_desc: question.question_desc,
      correct_answer: question.correct_answer,
      answer_options: shuffle([question.option_1, question.option_2, question.option_3, question.correct_answer])
    }
  });
  return(
    <div><Quiz questions={formattedQuestions} quizName={props.results[0].name}/></div>
  )
}
