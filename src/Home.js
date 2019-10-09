import React from 'react';
import { connect } from 'react-redux';

const _Home = ({ _schools, popularSchool, maxEnrolled })=> {
  if (_schools.length === 0 || maxEnrolled === 0) {
    return (
      <h5>loading...</h5>
    );
  }
  else {
    return (
      <div>
        <h3>Home</h3>
        <div>Our Most Popular school is { popularSchool.name } with { popularSchool.enrolled.length } students.</div>
      </div>
    );
  }
}

const mapStateToProps = ({ schools, students })=> {
  //find students enrolled at each school
  const _schools = schools.map( school => {
    const _students = students.filter( student => student.schoolId === school.id);
    return {...school, enrolled: _students, studentCount: _students.length }
  });
  console.log('_schools', _schools);

  //find the most popular school
  let studentCountArr = [];
  _schools.forEach( school => studentCountArr.push(school.studentCount));
  const maxEnrolled = studentCountArr.reduce((acc, curr)=> curr > acc ? curr : acc, 0);
  //console.log('maxEnrolled', maxEnrolled)
  const popularSchool = _schools.find( school => school.enrolled.length === maxEnrolled);

  return {
    _schools,
    students,
    popularSchool,
    maxEnrolled
  }
}

const Home = connect(mapStateToProps)(_Home);

export default Home;
