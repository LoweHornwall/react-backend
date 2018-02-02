import React from "react";
import AnswerOption from "./AnswerOption";

export default (props) => {
  let onAnswerClick = props.onAnswerClick;
  let question = props.question;
  return(
    <div>
      <h3>{question.question_desc}</h3>
      {question.answer_options.map(answer_option => (
        <AnswerOption onAnswerClick={onAnswerClick} answer={answer_option} key={answer_option} />
      ))} 
    </div>
  );
}