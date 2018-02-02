import React from "react";

export default (props) => {
  let onAnswerClick = props.onAnswerClick;
  let answer = props.answer

  let handleAnswerClick = () => {
    onAnswerClick(answer);
  }
  return (
    <button onClick={handleAnswerClick}>{answer}</button>
  )
}