import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent, updateStudent } from './store';

const _Students = ({ students, _students, schools, destroy, update })=> {
  return (
    <div>
      <div>There are ({ students.length }) students</div>

      <ul className='tiles'>
        {
          _students.map( student => <li key={student.id}>
            <div><b>{ student.firstName } { student.lastName }</b></div>
            <div>GPA: { student.GPA }</div>
            <div>attends: { student.enrolledAt !== undefined ? student.enrolledAt.name : 'Not enrolled'}</div>
            <form>
              <select onChange={ (ev)=> {
                console.log('student before change', student);
                if (student.id !== undefined){
                  if( ev.target.value === 'notEnrolled'){
                    update({ ...student, schoolId: null })
                  }
                  else {
                    update({ ...student, schoolId: ev.target.value })
                  }
                }
              }}>
                <option value={null}>--Select School--</option>
                <option value='notEnrolled'>Not Enrolled</option>
                {
                  schools.map( school => <option key={school.id} value={ school.id}>{ school.name }</option>)
                }
              </select>
            </form>
            <div><button className='destroyButton' onClick={ ()=> destroy(student) }>Destroy Student</button></div>
          </li>)
        }
      </ul>

    </div>
  )
}

const mapStateToProps = ({ students, schools })=> {
  const _students = students.map( student => {
    let enrolledAt;
    if (students.length === 0 && schools.length === 0){
      enrolledAt = null;
    }
    else {
      enrolledAt = schools.find( school => school.id === student.schoolId)
    }
    return {...student, enrolledAt }
  })
  //console.log('_students', _students);
  return {
    students,
    schools,
    _students
  }
}

const mapDispatchToProps = (dispatch, getState)=> {
  return {
    destroy: (student)=> dispatch(deleteStudent(student)),
    update: (student)=> dispatch(updateStudent(student))
  };
}

const Students = connect(mapStateToProps, mapDispatchToProps)(_Students);

export default Students;
