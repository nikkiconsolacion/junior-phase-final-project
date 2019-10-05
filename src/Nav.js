import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ count })=> {
  return (
    <nav>
      <Link to='/'>Schools ({ count })</Link>
      <Link to='/students'>Students</Link>
    </nav>
  );
}

const Nav = connect(({ schools })=> {
  return {
    count: schools.length
  }
})(_Nav)

export default Nav;
