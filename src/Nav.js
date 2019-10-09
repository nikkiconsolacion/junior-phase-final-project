import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ schoolCount, studentCount, location, popularSchool, topSchool })=> {
  if (popularSchool === undefined || topSchool === undefined) {
    return (
      <h5>loading...</h5>
    );
  }
  else {
    return (
      <header>
        <nav>
          <Link to='/' className={ location.pathname === '/' ? 'selected' : ''}><h1>Acme Schools</h1></Link>
          <Link to='/schools' className={ location.pathname === '/schools' ? 'selected' : ''}>Schools ({ schoolCount })</Link>
          <Link to='/students' className={ location.pathname === '/students' ? 'selected' : ''}>Students ({ studentCount })</Link>
          <Link to={`/schools/${popularSchool.id}`} className={ location.pathname === `/schools/${popularSchool.id}` ? 'selected' : ''}>Most Popular { popularSchool.name } ({ popularSchool.enrolled.length })</Link>
          <Link to={`/schools/${topSchool.id}`} className={ location.pathname === `/schools/${topSchool.id}` ? 'selected' : ''}>Top School { topSchool.name }</Link>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ schools, students })=> {
  //find students enrolled at each school and average GPA
  const _schools = schools.map( school => {
    const _students = students.filter( student => student.schoolId === school.id);
    return {...school, enrolled: _students, studentCount: _students.length }
  });

  //find the most popular school
  let studentCountArr = [];
  _schools.forEach( school => studentCountArr.push(school.studentCount));
  const maxEnrolled = studentCountArr.reduce((acc, curr)=> curr > acc ? curr : acc, 0);
  const popularSchool = _schools.find( school => school.enrolled.length === maxEnrolled);

  //find top performing school based on GPA
  const _schoolsWithGPA = _schools.map( school => {
    let gpas = [];
    school.enrolled.forEach( student => gpas.push(student.GPA*1)); //needed to convert string to number
    let averageGPA = 0;
    if (gpas.length > 0){
      averageGPA = gpas.reduce((acc, curr)=> acc + curr) / school.enrolled.length;
    }
    return {...school, averageGPA }
  });
  let gpaArr = [];
  _schoolsWithGPA.forEach( school => gpaArr.push(school.averageGPA));
  const maxGPA = gpaArr.reduce((acc, curr)=> curr > acc ? curr : acc, 0);
  const topSchool = _schoolsWithGPA.find( school => school.averageGPA === maxGPA);

  return {
    students,
    popularSchool,
    topSchool,
    schoolCount: schools.length,
    studentCount: students.length
  }
}

const Nav = connect(mapStateToProps)(_Nav);

export default Nav;
