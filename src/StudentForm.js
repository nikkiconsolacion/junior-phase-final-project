import React, { Component } from 'react';
import { connect } from 'react-redux';

class _StudentForm extends Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      GPA: null,
      schoolId: null
    }
  }

  // handleChange = (ev)=> {
  //   this.setState({
  //     [ev.target.name]: ev.target.value
  //   })
  // }
  // handleSubmit = (ev)=> {
  //   ev.preventDefault();
  //   console.log(this.state)
  // }
  render(){
    //console.log('schools', this.props.schools)
    return (
      <form onSubmit={ (ev)=> {
        ev.preventDefault();
        console.log('state', this.state);
        } }>
        First Name <input type='text' name='firstname' onChange={ (ev)=> this.setState({ firstName: ev.target.value })}></input><br></br>
        Last Name <input type='text' name='lastname' onChange={ (ev)=> this.setState({ lastName: ev.target.value })}></input><br></br>
        Email <input type='email' name='email' onChange={ (ev)=> this.setState({ email: ev.target.value })}></input><br></br>
        GPA <input type='number' step='0.01' name='gpa' onChange={ (ev)=> this.setState({ GPA: ev.target.value })}></input><br></br>
        Enroll at: <select name='schools' onChange={ (ev)=> this.setState({ schoolId: ev.target.value })}>
          <option value='notEnrolled'>--Not Enrolled--</option>
          {
            this.props.schools.map( school => <option key={school.id} value={ school.id}>{ school.name }</option>)
          }

        </select><br></br>
        <button>Save</button>
      </form>
    );
  }
}

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  }
}

const StudentForm = connect(mapStateToProps)(_StudentForm)

export default StudentForm;
