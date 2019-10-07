import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunks from 'redux-thunk';

const ADD_SCHOOL = 'ADD_SCHOOL';
const SET_SCHOOLS = 'SET_SCHOOLS';
const ADD_STUDENT = 'ADD_STUDENT';
const SET_STUDENTS = 'SET_STUDENTS';

const schoolReducer = (state = [], action)=> {
  if(action.type === SET_SCHOOLS){
    return action.schools;
  }
  if(action.type === ADD_SCHOOL){
    return [...state, action.school];
  }
  return state;
}

const studentReducer = (state = [], action)=> {
  if(action.type === SET_STUDENTS){
    return action.students;
  }
  if(action.type === ADD_STUDENT){
    return [...state, action.student];
  }
  return state;
}

const reducer = combineReducers({
  schools: schoolReducer,
  students: studentReducer
});

const store = createStore(reducer, applyMiddleware(thunks));

//action creators

const setSchools = (schools)=> {
  return {
    type: SET_SCHOOLS,
    schools
  };
}

const setStudents = (students)=> {
  return {
    type: SET_STUDENTS,
    students
  };
}

const _addStudent = (student)=> {
  return { type: ADD_STUDENT, student }
};

const addSchool = (school)=> {
  return { type: ADD_SCHOOL, school }
};

//thunks

const fetchSchools = ()=> {
  return async(dispatch)=> {
    const schools = (await axios.get('/api/schools')).data;
    dispatch(setSchools(schools));
  }
}

const fetchStudents = ()=> {
  return async(dispatch)=> {
    const students = (await axios.get('/api/students')).data;
    dispatch(setStudents(students));
  }
}

const addStudent = (student)=> {
  return async(dispatch, getState)=> {
    const created = (await axios.post('/api/students', student)).data;
    console.log('created', created);
    return dispatch(_addStudent(created))
  }
}

export default store;
export { fetchSchools, fetchStudents, addStudent };
