import React from 'react';
import { connect } from 'react-redux';
import { deleteStudent, updateStudent } from './store';

const _School = ({ schools, students, match, destroy, update, unenrolledStudents })=> {
  const schoolId = match.params.id
  // let school;

  if (schools.length === 0) {
    return (
      <h5>loading...</h5>
    );
  }
  else {
    const school = schools.find( _school => _school.id === schoolId);
    const enrolledStudents = students.filter( student => student.schoolId === school.id);
    return (
      <div>
        <h3>{school.name} ({ enrolledStudents.length } Students enrolled)</h3>
        <form>
          <select onChange={ (ev)=> {
            const student = students.find(student => student.id === ev.target.value);
            const newSchool = schools.find( _school => school.id === _school.id);
            update({ ...student, schoolId: newSchool.id })
          }}>
            <option value='addStudent'>--Add Student--</option>
            {
              unenrolledStudents.map( student => <option key={student.id} value={ student.id} name={ student.id}>{ student.firstName } { student.lastName }</option>)
            }
          </select>
        </form>
        <ul className='tiles'>
          {
            enrolledStudents.map( student => <li key={student.id}>
              <div><b>{ student.firstName } { student.lastName }</b></div>
              <div>GPA: { student.GPA }</div>
              <form>
                <select onChange={ (ev)=> {
                  console.log('student before change', student);
                  if (student.id !== undefined && student.schoolId !== 'notEnrolled') {
                    update({ ...student, schoolId: ev.target.value })
                  }
                  else if (student.id !== undefined && ev.target.value === 'notEnrolled') {
                    update({ ...student, schoolId: null })
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
    );
  }
}

const mapStateToProps = ({ schools, students })=> {
  const unenrolledStudents = students.filter( student => student.schoolId === null);
  console.log('unenrolledStudents in mapStateToProps', unenrolledStudents);
  return {
    schools,
    students,
    unenrolledStudents
  }
};

const mapDispatchToProps = (dispatch)=> {
  return {
    destroy: (student)=> dispatch(deleteStudent(student)),
    update: (student)=> dispatch(updateStudent(student))
  };
}

const School = connect(mapStateToProps, mapDispatchToProps)(_School);

export default School;
