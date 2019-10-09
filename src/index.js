import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Schools from './Schools';
import School from './School';
import Students from './Students';
import StudentForm from './StudentForm';

import store, { fetchSchools, fetchStudents, addStudent } from './store';


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
          <Route component={ StudentForm } />
          <Route exact path='/' component={ Home } />
          <Route exact path='/schools' component={ Schools } />
          <Route path='/students/:id?' component={ Students } />
          <Route path='/schools/:id' component={ School } />
        </HashRouter>
      </Provider>
    )
  }
}



ReactDOM.render(<App />, document.querySelector("#root"));
