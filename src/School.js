import React from 'react';
import { connect } from 'react-redux';
import Schools from './Schools';

const _School = ({ schools, students, match })=> {
  const schoolId = match.params.id
  let school;

  if (schools.length === 0) {
    return (
      <h5>loading...</h5>
    );
  }
  else {
    school = schools.find( school => school.id === schoolId);
    return (
      <div>
        <h3>{school.name} ({ students.filter( student => student.schoolId === schoolId).length } Students enrolled)</h3>
      </div>
    );
  }
}

const mapStateToProps = ({ schools, students })=> ({ schools, students });

const School = connect(mapStateToProps)(_School);

export default School;
