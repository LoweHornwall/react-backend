import React from "react";
import { Route, Switch } from "react-router-dom";
import fetchComponent from "./components/FetchComponent";
import Home from "./containers/Home";
import Quizzes from "./containers/QuizzesPage";
import GameArea from "./containers/quiz/GameArea";
import NotFound from "./containers/NotFound";
//import asyncComponent from "./components/AsyncComponent";
//const QuizzesPage = asyncComponent(() => import("./containers/QuizzesPage"));
const QuizzesPage = fetchComponent(Quizzes, "quizzes/");
const GameAreaPage = fetchComponent(GameArea, "quizzes/show/");
export default () => 
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/quizzes" component={QuizzesPage} />
    <Route exact path="/quizzes/:quizName" component={GameAreaPage} />
    <Route component={NotFound} />
  </Switch>;  
