import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { HashRouter, Link, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './Nav';

import store from './store';

class _Students extends React.Component {
  constructor(){
    super();
    this.state = {
      students: []
    }
  }
  async componentDidMount(){
    const students = (await axios.get('/api/students')).data;
    this.setState({ students });
  }
  render(){
    const { students } = this.state;
    return (
      <div>

        <ul>
          {
            students.map( student => <li key={ student.id }>{ student.firstName }</li>)
          }
        </ul>
      </div>
    )
  }

}

class App extends React.Component{
  constructor(){
    super();
    this.state = {
    }
  }
  render(){
    return (
      <Provider store={ store }>
        <HashRouter>
          <Route component={ Nav } />
          <Route exact path='/' component={ _Students } />
        </HashRouter>
      </Provider>
    )
  }
}



ReactDOM.render(<App />, document.querySelector("#root"));
