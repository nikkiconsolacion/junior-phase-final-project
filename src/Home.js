import React from 'react';
import { connect } from 'react-redux';

const _Home = ({ _schoolsWithGPA, popularSchool, maxEnrolled, topSchool })=> {
  if (_schoolsWithGPA.length === 0 || maxEnrolled === 0) {
    return (
      <h5>loading...</h5>
    );
  }
  else {
    return (
      <div>
        <h3>Home</h3>
        <div>Our Most Popular school is { popularSchool.name } with { popularSchool.enrolled.length } students.</div>
        <div>Our top performing school is { topSchool.name } with an average GPA of { topSchool.averageGPA }</div>
      </div>
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
  //console.log('_schoolsWithGPA', _schoolsWithGPA);
  let gpaArr = [];
  _schoolsWithGPA.forEach( school => gpaArr.push(school.averageGPA));
  const maxGPA = gpaArr.reduce((acc, curr)=> curr > acc ? curr : acc, 0);
  const topSchool = _schoolsWithGPA.find( school => school.averageGPA === maxGPA);

  return {
    _schoolsWithGPA,
    students,
    popularSchool,
    maxEnrolled,
    topSchool
  }
}

const Home = connect(mapStateToProps)(_Home);

export default Home;
