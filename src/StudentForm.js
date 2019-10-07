import React, { Component } from 'react';

class StudentForm extends Component{
  constructor(){
    super();
    this.state = {
      firstname: '',
      lastname: ''
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
    return (
      // <div>
      //   <form onSubmit={ this.handleSubmit }>
      //     <div>
      //       First Name <input type='text' name='firstname' onChange={ this.handleChange }></input>
      //     </div>
      //     <div>
      //       Last Name <input type='text' name='lastname' onChange={ this.handleChange }></input>
      //     </div>
      //     <button>Save</button>
      //   </form>
      // </div>
      <form>
        First Name <input type='text' name='firstname'></input><br></br>
        Last Name <input type='text' name='lastname'></input><br></br>
        Email <input type='email' name='email'></input><br></br>
        GPA <input type='number' name='gpa'></input><br></br>
        Enroll at: <select name='schools'>
          <option value='notEnrolled'>--Not Enrolled--</option>
          <option value='calpoly'>Cal Poly</option>
          <option value='notredame'>Notre Dame</option>
          <option value='stanford'>Stanford</option>
          <option value='mit'>MIT</option>
          <option value='harvard'>Harvard</option>
          <option value='yale'>Yale</option>
        </select><br></br>
        <button>Save</button>
      </form>
    );
  }
}

export default StudentForm;
