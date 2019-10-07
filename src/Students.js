import React from 'react';
import { connect } from 'react-redux';

const _Students = ({ students })=> {
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
            students.map( student => <tr key={ student.id } onClick={ ()=> console.log(student.firstName)} className='studentTr'>
                <td>{ student.firstName }</td>
                <td>{ student.lastName }</td>
                <td>{ student.email }</td>
                <td>{ student.GPA }</td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = ({ students })=> ({ students });

const Students = connect(mapStateToProps)(_Students);

export default Students;
