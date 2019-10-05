import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const ADD_SCHOOL = 'ADD_SCHOOL';
const SET_SCHOOLS = 'SET_SCHOOLS';

const schoolReducer = (state = [], action)=> {
  if(action.type === SET_SCHOOLS){
    state = action.schools;
  }
  if(action.type === ADD_SCHOOL){
    state = [...state, action.school];
  }
  return state;
}

const reducer = combineReducers({
  schools: schoolReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const setSchools = (schools)=> {
  return {
    type: SET_SCHOOLS,
    schools
  };
}

const addSchool = (school)=> {
  return { type: ADD_SCHOOL, school }
};

export default store;
