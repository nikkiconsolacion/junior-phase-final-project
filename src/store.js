import { combineReducers, createStore, applyMiddleware, bindActionCreators } from 'redux';
import axios from 'axios';
import thunks from 'redux-thunk';

//constants
const SET_SCHOOLS = 'SET_SCHOOLS';
const ADD_STUDENT = 'ADD_STUDENT';
const SET_STUDENTS = 'SET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

const schoolsReducer = (state = [], action)=> {
  if(action.type === SET_SCHOOLS){
    return action.schools;
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
    });
  }
  return state;
}

const reducer = combineReducers({
  schools: schoolsReducer,
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
    return dispatch(setSchools(schools));
  }
}

const fetchStudents = ()=> {
  return async(dispatch)=> {
    const students = (await axios.get('/api/students')).data;
    return dispatch(setStudents(students));
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
    console.log('student after change in thunks', student)
    const updatedStudent = (await axios.put(`/api/students/${student.id}`, student)).data[1][0];
    console.log('updated student in thunks', updatedStudent)
    return dispatch(_updateStudent(updatedStudent));
  }
}

export default store;
export { fetchSchools, fetchStudents, addStudent, deleteStudent, updateStudent };
