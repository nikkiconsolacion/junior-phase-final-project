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
  }
  async create(){
    try {
      await this.props.create(this.state)
    }
    catch(ex){
      this.setState({ error: ex.response.data.message })
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
    const { create } = this;
    return (
      <form onSubmit={ (ev)=> {
        ev.preventDefault();
        console.log('state', this.state);
        } }>
        First Name <input type='text' name='firstName' onChange={ (ev)=> this.setState({ firstName: ev.target.value }) }></input><br></br>
        Last Name <input type='text' name='lastName' onChange={ (ev)=> this.setState({ lastName: ev.target.value })}></input><br></br>
        Email <input type='email' name='email' onChange={ (ev)=> this.setState({ email: ev.target.value })}></input><br></br>
        GPA <input type='number' step='0.01' name='GPA' onChange={ (ev)=> this.setState({ GPA: ev.target.value })}></input><br></br>
        Enroll at: <select name='schoolId' onChange={ (ev)=> this.setState({ schoolId: ev.target.value })}>
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

// const getStudent = ()=> {
//   return async(dispatch)=> {
//     addStudent: (student)=>
//   }
// }

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  }
}

const mapDispatchToProps = (dispatch, getState)=> {
  return {
    create: (student)=> dispatch(addStudent(student))
  };
}

const StudentForm = connect(mapStateToProps, mapDispatchToProps)(_StudentForm)

// const StudentForm = connect(({ schools, students })=> {
//   return {
//     schools,
//     students
//   }
// })(_StudentForm)

export default StudentForm;