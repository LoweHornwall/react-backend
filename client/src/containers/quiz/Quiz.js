import React, { Component } from "react";
import Question from "./Question";
import RestartScreen from "./RestartScreen";

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {currentQuestionIdx: 0, score: 0}

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
  }

  handleAnswerClick(answer) {
    let currentQuestion = this.props.questions[this.state.currentQuestionIdx];
    if (currentQuestion.correct_answer === answer) {
      this.setState({currentQuestionIdx: this.state.currentQuestionIdx + 1, score: this.state.score + 1});
    } else {
      this.setState({currentQuestionIdx: this.state.currentQuestionIdx + 1});
    }
  }

  handleRestartClick() {
    this.setState({currentQuestionIdx: 0, score: 0});
  }

  render() {
    let currentQuestion = this.props.questions[this.state.currentQuestionIdx];

    return (
      <div>
        <h3>Quiz: {this.props.quizName}</h3>
        {this.state.currentQuestionIdx < this.props.questions.length ?
          <Question onAnswerClick={this.handleAnswerClick} question={currentQuestion} /> :
          <RestartScreen onRestartClick={this.handleRestartClick} />}
        <p>Score: {this.state.score}</p>
      </div>
    )
  }
}

export default Quiz;  