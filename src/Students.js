import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const _Students = ({ students, location })=> {
  return (
    <div>
      <div>There are ({ students.length }) students</div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map( student => <tr key={ student.id } onClick={ ()=> console.log(location, student.id)
            } className='studentTr' >
                <td>{ student.firstName }</td>
                <td>{ student.lastName }</td>
                <td>{ student.email }</td>
                <td>{ student.GPA }</td>
                <td><Link to={`/students/${student.id}`}>Delete</Link></td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({ students, location })=> ({ students });

const mapDispatchToProps = (dispatch, getState)=> {
  return {
    create: (student)=> dispatch(addStudent(student))
  };
}

const Students = connect(mapStateToProps)(_Students);

export default Students;
