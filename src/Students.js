import React from 'react';
import { connect } from 'react-redux';

const _Students = ({ students })=> {
  return (
    <div>
      <div>There are ({ students.length }) students</div>
      <ul>
        {
          students.map( student => <li key={ student.id}><div>{ student.firstName } { student.lastName } {student.email} {student.GPA}</div></li>)
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
