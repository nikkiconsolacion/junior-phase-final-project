import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent } from './store';


const _Schools = ({ schools, students, update })=> {
  return (
    <div>
      <div>There are ({ schools.length }) schools</div>
      <ul className='tiles'>
        {
          schools.map( school => <li className='schoolLi' key={ school.id}>
              <div className='schoolDiv'>
                <div>
                  <Link to={`/schools/${school.id}`} onClick={ ()=> console.log(school.name) }>{ school.name }</Link>
                </div>
                <div>
                  Student Count { students.filter( student => student.schoolId === school.id ).length}
                </div>
                <form>
                  <select onChange={ (ev)=> {
                    console.log('student before change', student);
                    student.id !== undefined ? update({ ...student, schoolId: ev.target.value, enrolledAt: schools.find( school => school.id === ev.target.value) }) : null;

                  }}>
                    <option value={null}>--Select School--</option>
                    <option value={null}>Not Enrolled</option>
                    {
                      schools.map( school => <option key={school.id} value={ school.id}>{ school.name }</option>)
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
  return {
    schools,
    students
  }
}

const mapDispatchToProps = (dispatch, getState)=> {
  return {
    update: (student)=> dispatch(updateStudent(student))
  };
}

const Schools = connect(mapStateToProps, mapDispatchToProps)(_Schools);

export default Schools;
