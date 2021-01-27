import React from 'react'
import Header from './components/Header'
import List from './components/List'
import Item from './components/Item'
import './App.css'

const key = process.env.REACT_APP_API_KEY

function App() {
  return (
    <div>
      <Header />
      {/* <List API_key={key} /> */}
      <Item API_key={key} />
    </div>
  );
}

export default App;
