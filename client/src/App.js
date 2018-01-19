import React, { Component } from 'react';
import './App.css';


class QuestionField extends React.Component {
  render() {
    const question = this.props.question;
    const question_number = this.props.question_number;
    return(
      <div>
        <h1>{question_number}. {question}</h1>
      </div>
    );
  }
}

class AnswerField extends React.Component {
  render() {
    const options = this.props.options;
    return(
      <div className="AnswerField">
        <AnswerOption onAnswerClick={this.props.onAnswerClick} option={options[0]} />
        <AnswerOption onAnswerClick={this.props.onAnswerClick} option={options[1]} />
        <AnswerOption onAnswerClick={this.props.onAnswerClick} option={options[2]} />
        <AnswerOption onAnswerClick={this.props.onAnswerClick} option={options[3]} />
      </div>
    ); 
  };
}

class AnswerOption extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  handleAnswerClick() {
    this.props.onAnswerClick(this.props.option);
  }

  render() {
    return(
      <button className="AnswerOption" onClick={this.handleAnswerClick}>{this.props.option}</button>
    ); 
  }
}

class ScoreBar extends React.Component {
  render() {
    return(
      <div>
        <p>Score: {this.props.score}</p>
      </div>
    );
  }
}


class Quiz extends React.Component {
  render() {
    const question_number = this.props.question_number;
    const questions = this.props.questions;

    return(
      <div>
        <QuestionField question={questions[question_number].question}  question_number={question_number + 1} />
        <AnswerField onAnswerClick={this.props.onAnswerClick} options={questions[question_number].options} />
        <ScoreBar score={this.props.score} />
      </div>
    );
  }
}

class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleRestartClick = this.handleRestartClick.bind(this);
  }

  handleRestartClick() {
    this.props.onRestartClick();
  }
  render() {
    return (
      <div>
        <h1>The end!</h1>
        <ScoreBar score={this.props.score} />
        <button onClick={this.handleRestartClick}>Restart</button>
      </div>
    );
  }
}

class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {question_number: 0, score: 0};
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
  }

  handleAnswerClick(answer) {
    const current_question = this.props.questions[this.state.question_number];
    if (current_question.correct === answer) {
      this.setState({question_number: this.state.question_number + 1, score: this.state.score + 1});
      console.log("Correct!");
    } else {
     this.setState({question_number: this.state.question_number + 1});
    }
  }

  handleRestartClick() {
    this.setState({question_number: 0, score: 0});
  }

  render() {
    const questions = this.props.questions;
    let render = null;
    if (this.state.question_number < questions.length) {
      render = <Quiz 
                question_number={this.state.question_number} 
                questions={this.props.questions} 
                onAnswerClick={this.handleAnswerClick}  
                score={this.state.score} />;
    } else {
      render = <ScoreScreen score={this.state.score} onRestartClick={this.handleRestartClick}/>
    }
    return(
      <div className="GameArea">
        {render}
      </div>
    )
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {questions: []};
  }

  componentDidMount() {
    fetch("/questions")
      .then(res => res.json())
      .then(questions => this.setState({ questions }));
  }

  render() {
    var render = null
    if (this.state.questions.length > 0) {
      render = <GameArea questions={this.state.questions}/>
    }
    return (
      <div className="App">
        {render}
      </div>
    );
  }
}

export default App;
