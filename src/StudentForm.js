import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent } from './store';

class _StudentForm extends Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      GPA: null,
      schoolId: null,
      error: ''
    }
    this.create = this.create.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async create(){
    try {
      await this.props.create(this.state)
    }
    catch(ex){
      this.setState({ error: ex.response.data.message })
    }
  }
  handleChange(ev){
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  render(){
    //console.log('schools', this.props.schools)
    const { create, handleChange } = this;
    return (
      <form id='studentForm' onSubmit={ (ev)=> ev.preventDefault()}>
        First Name <input type='text' name='firstName' onChange={ (ev)=> handleChange(ev) }></input><br></br>
        Last Name <input type='text' name='lastName' onChange={ (ev)=> handleChange(ev) }></input><br></br>
        Email <input type='email' name='email' onChange={ (ev)=> handleChange(ev) }></input><br></br>
        GPA <input type='number' step='0.01' name='GPA' onChange={ (ev)=> handleChange(ev) }></input><br></br>
        Enroll at: <select name='schoolId' onChange={ (ev)=> handleChange(ev) }>
          <option value='notEnrolled'>--Not Enrolled--</option>
          {
            this.props.schools.map( school => <option key={school.id} value={ school.id}>{ school.name }</option>)
          }
        </select><br></br>
        <button onClick={ create }>Save</button>
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

const mapDispatchToProps = (dispatch)=> {
  return {
    create: (student)=> dispatch(addStudent(student))
  };
}

const StudentForm = connect(mapStateToProps, mapDispatchToProps)(_StudentForm)

export default StudentForm;
