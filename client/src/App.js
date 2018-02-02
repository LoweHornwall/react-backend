import React, { Component } from 'react';
import './App.css';
import Routes from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";

class App extends Component {
  render() {
    return(
    <ErrorBoundary >  
      <Routes />
    </ErrorBoundary>   
    )    
  }
}

export default App;
