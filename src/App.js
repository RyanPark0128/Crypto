import React from 'react'
import Header from './components/Header'
import List from './components/List'
import Item from './components/Item'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const key = process.env.REACT_APP_API_KEY

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <Header />
          <List API_key={key} />
        </Route>
        <Route path="/item/:id">
          <Header />
          <Item API_key={key} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
