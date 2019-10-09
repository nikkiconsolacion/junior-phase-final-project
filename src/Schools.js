import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from './store';


const _Schools = ({ schools, students, update, unenrolledStudents })=> {
  return (
    <div>
      <div>{}</div>
      <ul className='tiles'>
        {
          schools.map( school => <li className='schoolLi' key={ school.id}>
              <div className='schoolDiv'>
                <div>
                  <Link to={`/schools/${school.id}`}>{ school.name }</Link>
                </div>
                <div>
                  Student Count { students.filter( student => student.schoolId === school.id ).length}
                </div>
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
              </div>
            </li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ schools, students })=> {
  const unenrolledStudents = students.filter( student => student.schoolId === null);

  return {
    schools,
    students,
    unenrolledStudents
  }
}

const mapDispatchToProps = (dispatch, getState)=> {
  return {
    update: (student)=> dispatch(updateStudent(student))
  };
}

const Schools = connect(mapStateToProps, mapDispatchToProps)(_Schools);

export default Schools;
