import { combineReducers, createStore, applyMiddleware, bindActionCreators } from 'redux';
import axios from 'axios';
import thunks from 'redux-thunk';

const SET_SCHOOLS = 'SET_SCHOOLS';
//const SET_SCHOOL = 'SET_SCHOOL';
const ADD_STUDENT = 'ADD_STUDENT';
const SET_STUDENTS = 'SET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const schoolReducer = (state = [], action)=> {
  if(action.type === SET_SCHOOLS){
    return action.schools;
  }
  // if(action.type === SET_SCHOOL){
  //   return action.school;
  // }
  return state;
}

const studentReducer = (state = [], action)=> {
  if(action.type === SET_STUDENTS){
    return action.students;
  }
  if(action.type === ADD_STUDENT){
    return [...state, action.student];
  }
  if(action.type === DELETE_STUDENT){
    return state.filter( student => student.id !== action.student.id);
  }
  if(action.type === UPDATE_STUDENT){
    return state.map( student => {
      if( student.id === action.student.id){
        return action.student;
      } else {
        return student;
      }
    })
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

// const setSchool = (school)=> {
//   return {
//     type: SET_SCHOOL,
//     school
//   }
// }

const setStudents = (students)=> {
  return {
    type: SET_STUDENTS,
    students
  };
}

const _addStudent = (student)=> {
  return { type: ADD_STUDENT, student }
};

const _deleteStudent = (student)=> {
  return { type: DELETE_STUDENT, student}
}

const _updateStudent = (student)=> {
  return { type: UPDATE_STUDENT, student }
}

//thunks

const fetchSchools = ()=> {
  return async(dispatch)=> {
    const schools = (await axios.get('/api/schools')).data;
    dispatch(setSchools(schools));
  }
}

// const fetchSchool = (school)=> {
//   return async(dispatch)=> {
//     const _school = (await axios.get(`/schools/${school.id}`)).data;
//     dispatch(setSchool(_school));
//   }
// }

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

const deleteStudent = (student)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/students/${student.id}`, student);
    return dispatch(_deleteStudent(student));
  }
}

const updateStudent = (student)=> {
  return async(dispatch)=> {
    const _student = (await axios.put(`/api/students/${student.id}`)).data;
    return dispatch(_updateStudent(_student));
  }
}

export default store;
export { fetchSchools, fetchStudents, addStudent, deleteStudent, updateStudent };
