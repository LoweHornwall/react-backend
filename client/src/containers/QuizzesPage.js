import React, { Component } from "react";
import QuizForm from "./QuizForm";
import { Link } from "react-router-dom";
class QuizzesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    }

    this.toggleForm = this.toggleForm.bind(this);
  }

  toggleForm() {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  }

  render() {
    let quizzesList = null;
    if(this.props.results) {
      quizzesList = this.props.results.map(quiz => {
        let href = "quizzes/" + quiz.name;
        return <li key={quiz.id}>
          <Link to={href}>{quiz.name}</Link>
          <b> category:</b> {quiz.category} 
          <b> Questions #:</b> {quiz.count}
          <b> created at:</b> {quiz.created_at}
        </li>
      });
    }
    let formArea = this.state.showForm? <QuizForm doFetch={this.props.doFetch}/> : 
      <button onClick={this.toggleForm}>Create Quiz</button>
    return(
      <div>
      {quizzesList}
      {formArea}
      </div>
    )
  }
}

export default QuizzesPage;