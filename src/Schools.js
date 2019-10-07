import React from 'react';
import { connect } from 'react-redux';

const _Schools = ({ schools, students })=> {
  return (
    <div>
      <div>There are ({ schools.length }) schools</div>
      <ul>
        {
          schools.map( school => <li key={ school.id}><div className='school'>
            { school.name }
              <div>Student Count { students.filter( student => student.schoolId === school.id ).length}</div>
            </div></li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ schools })=> ({ schools });

const Schools = connect(({ schools, students })=> {
  return {
    schools,
    students
  }
})(_Schools);
//const Schools = connect(mapStateToProps)(_Schools);

export default Schools;
