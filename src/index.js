import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { HashRouter, Link, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';


class App extends React.Component{
  render(){
    return (
      <hr />
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
