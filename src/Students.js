import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { deleteStudent, updateStudent } from './store';

const _Students = ({ students, location, destroy, update })=> {
  return (
    <div>
      <div>There are ({ students.length }) students</div>
        <ul className='tiles'>
          {
            students.map( student => <li key={student.id}>
              <div><b>{ student.firstName } { student.lastName }</b></div>
              <div>GPA: { student.GPA }</div>
              <div><button onClick={ ()=> destroy(student) }>Destroy Student</button></div>
            </li>)
          }
        </ul>

    </div>
  )
}

const mapStateToProps = ({ students })=> ({ students });

const mapDispatchToProps = (dispatch, getState)=> {
  return {
    destroy: (student)=> dispatch(deleteStudent(student)),
    update: (student)=> dispatch(updateStudent(student))
  };
}

const Students = connect(mapStateToProps, mapDispatchToProps)(_Students);

export default Students;
