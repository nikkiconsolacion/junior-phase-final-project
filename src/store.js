import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const ADD_SCHOOL = 'ADD_SCHOOL';
const SET_SCHOOLS = 'SET_SCHOOLS';
const ADD_STUDENT = 'ADD_STUDENT';
const SET_STUDENTS = 'SET_STUDENTS';

const schoolReducer = (state = [], action)=> {
  if(action.type === SET_SCHOOLS){
    state = action.schools;
  }
  if(action.type === ADD_SCHOOL){
    state = [...state, action.school];
  }
  return state;
}

const studentReducer = (state = [], action)=> {
  if(action.type === SET_STUDENTS){
    state = action.students;
  }
  if(action.type === ADD_STUDENT){
    state = [...state, action.student];
  }
  return state;
}

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
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

const fetchSchools = ()=> {
  return async(dispatch)=> {
    const schools = (await axios.get('/api/schools')).data;
    dispatch(setSchools(schools));
  }
}

const setStudents = (students)=> {
  return {
    type: SET_STUDENTS,
    students
  };
}

const addStudent = (student)=> {
  return { type: ADD_STUDENT, student }
};

const fetchStudents = ()=> {
  return async(dispatch)=> {
    const students = (await axios.get('/api/students')).data;
    dispatch(setStudents(students));
  }
}

export default store;
export { fetchSchools, fetchStudents, addStudent };
