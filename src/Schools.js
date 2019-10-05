import React from 'react';
import { connect } from 'react-redux';

const _Schools = ({ schools })=> {
  return (
    <div>
      <div>There are ({ schools.length }) schools</div>
      <ul>
        {
          schools.map( school => <li key={ school.id}><div>{ school.name }</div></li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ schools })=> ({ schools });

const Schools = connect(({ schools })=> {
  return {
    schools
  }
})(_Schools);
//const Schools = connect(mapStateToProps)(_Schools);

export default Schools;
