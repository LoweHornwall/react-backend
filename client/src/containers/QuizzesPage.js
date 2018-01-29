import React, { Component } from 'react';

class QuizzesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {quizzes: []};
  } 

  componentDidMount() {
    fetch(this.props.location.pathname, {
      accept: "application/json"
    })
    .then(data => data.json())
    .then(jsonData => {
      this.setState({quizzes: jsonData.results.results});
    });
  }

  render() {
    let quizzesList = null
    if (this.state.quizzes !== null) {
      quizzesList = this.state.quizzes.map(quiz => {
        return <li key={quiz.id}>{quiz.name}</li>
      });
    }
    return(
      <ul>{quizzesList}</ul>
    )
  }
}

export default QuizzesPage;