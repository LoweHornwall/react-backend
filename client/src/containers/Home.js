import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return(
      <Link to="/quizzes">View Quizzes</Link>
    )
  } 
}

export default Home;