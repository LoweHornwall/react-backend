import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import QuizzesPage from "./containers/QuizzesPage";
import NotFound from "./containers/NotFound";

export default () => 
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/quizzes/page/:page" component={QuizzesPage} />
    <Route component={NotFound} />
  </Switch>;  
