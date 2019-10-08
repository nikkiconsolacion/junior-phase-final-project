import React from 'react';
import { connect } from 'react-redux';
import Schools from './Schools';

const _School = ({ schools })=> {
  return (
    <hr />
  )
}

const mapStateToProps = ({ schools })=> {
  if(!schools){
    return null;
  }
  else {
    return {
      schools
    }
  }
};

const School = connect(mapStateToProps)(_School);

export default School;
