import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ schoolCount, studentCount })=> {
  return (
    <nav>
      <h1>Acme Schools</h1>
      <Link to='/'>Schools ({ schoolCount })</Link>
      <Link to='/students'>Students ({ studentCount })</Link>
    </nav>
  );
}

const Nav = connect(({ schools, students })=> {
  return {
    schoolCount: schools.length,
    studentCount: students.length
  }
})(_Nav)

export default Nav;
