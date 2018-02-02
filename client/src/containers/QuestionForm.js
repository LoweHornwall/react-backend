import React from "react";
import "./QuizForm.css";

export default (props) => {
  var question = props.question;
  var idx = props.idx;
  var handleChange = props.handleChange;
  var handleRemove = props.handleRemove;
  var handleBlur = props.handleBlur;
  var shouldMarkError = props.shouldMarkError;
  return (
    <div>
      <label>
        Question Description: 
      <input 
        name="question_desc"
        type="text"
        maxLength="255"
        className={shouldMarkError("question_desc", idx) ? "error" : ""}
        value={question.question_desc}
        onBlur={handleBlur("question_desc", idx)}
        onChange={handleChange(idx)} />
      </label>
      <label>
        Option 1:
      <input 
        name="option_1"
        type="text"
        maxLength="255"
        className={shouldMarkError("option_1", idx) ? "error" : ""}
        value={question.option_1}
        onBlur={handleBlur("option_1", idx)}
        onChange={handleChange(idx)} />
      </label>  
      <label>
        option 2:
      <input 
        name="option_2"
        type="text"
        maxLength="255"
        className={shouldMarkError("option_2", idx) ? "error" : ""}
        value={question.option_2}
        onBlur={handleBlur("option_2", idx)}
        onChange={handleChange(idx)} />
      </label>  
      <label>
        option 3:
      <input 
        name="option_3"
        type="text"
        maxLength="255"
        className={shouldMarkError("option_3", idx) ? "error" : ""}
        value={question.option_3}
        onBlur={handleBlur("option_3", idx)}
        onChange={handleChange(idx)} />
      </label>      
      <label>
        Answer:
      <input 
        name="correct_answer"
        type="text"
        maxLength="255"
        className={shouldMarkError("correct_answer", idx) ? "error" : ""}
        value={question.correct_answer}
        onBlur={handleBlur("correct_answer", idx)}
        onChange={handleChange(idx)} />
      </label>
      <button type="button" onClick={handleRemove(idx)}>Remove</button>             
    </div>
  )  
}