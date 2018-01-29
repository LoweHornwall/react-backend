import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return(
      <Link to="/quizzes/page/1">View Quizzes</Link>
    )
  } 
}

export default Home;