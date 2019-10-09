import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ schoolCount, studentCount, location })=> {
  return (
    <header>
      <nav>
        <Link to='/' className={ location.pathname === '/' ? 'selected' : ''}><h1>Acme Schools</h1></Link>
        <Link to='/schools' className={ location.pathname === '/' ? 'selected' : ''}>Schools ({ schoolCount })</Link>
        <Link to='/students' className={ location.pathname === '/students' ? 'selected' : ''}>Students ({ studentCount })</Link>
      </nav>
    </header>
  );
}

const Nav = connect(({ schools, students })=> {
  return {
    schoolCount: schools.length,
    studentCount: students.length
  }
})(_Nav)

export default Nav;
