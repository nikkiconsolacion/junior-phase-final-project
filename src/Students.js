import React from 'react';
import { connect } from 'react-redux';

const _Students = ({ students })=> {
  return (
    <div>
      <div>There are ({ students.length }) students</div>
      <div>firstName lastName email GPA</div>
      {/* <table>
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
            students.map( student => <tr key={ student.id }>
                <td key={student.id + 'a'}>{ student.firstName }</td>
                <td key={student.id + 'b'}>{ student.lastName }</td>
                <td key={student.id + 'c'}>{ student.email }</td>
                <td key={student.id + 'd'}>{ student.GPA }</td>
              </tr>)
          }
        </tbody>
      </table> */}
      <ul>
        {
          students.map( student => <li key={ student.id }>
              { student.firstName } { student.lastName } { student.email } { student.GPA }
            </li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ students })=> ({ students });

const Students = connect(({ students })=> {
  return {
    students
  }
})(_Students);
//const Students = connect(mapStateToProps)(_Students);

export default Students;
