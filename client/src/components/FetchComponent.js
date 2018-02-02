import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

function fetchComponent(importComponent, path) {
  class FetchComponent extends Component {
    constructor(props) {
      super(props);

      this.state = { statusCode: null , results: null, fetchComplete: false};

      this.doFetch = this.doFetch.bind(this);
    }

    componentDidMount() {
      this.doFetch();
    } 

    doFetch() {
      let finalPath = "/api/" + path
      for (let propertyName in this.props.match.params) {
        finalPath += this.props.match.params[propertyName];
      }
      fetch(finalPath, {
       // credentials: "omit", //keeps fetch from being called instead of page on back in chrome
        accept: "application/json"
      })
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({
              statusCode: response.status,
              results: data.results,
              fetchComplete: true 
            });
          });
        } else {
          this.setState({
            statusCode: response.status,
            fetchComplete: true
          });
        }
      });
    }
 
    render() {
      let display = null; 
      if (this.state.statusCode === 200) {
        const ImportComponent = importComponent;
        display = ImportComponent? <ImportComponent doFetch={this.doFetch} results={this.state.results} /> : null;
      } else if (this.state.statusCode) {
       display = <ErrorPage statusCode={this.state.statusCode}/>
      }  
      return display;
    }

  }
  return FetchComponent;
}
export default fetchComponent;