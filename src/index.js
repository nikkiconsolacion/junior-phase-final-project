import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { HashRouter, Link, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';

import store, { fetchSchools, fetchStudents } from './store';


class App extends React.Component{
  constructor(){
    super();
    this.state = {
    }
  }
  async componentDidMount(){
    store.dispatch(fetchSchools());
    store.dispatch(fetchStudents());
  }
  render(){
    return (
      <Provider store={ store }>
        <HashRouter>
          <Route component={ Nav } />
          <Route exact path='/' component={ Schools } />
          <Route path='/students' component={ Students } />
        </HashRouter>
      </Provider>
    )
  }
}



ReactDOM.render(<App />, document.querySelector("#root"));
