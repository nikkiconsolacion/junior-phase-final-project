import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const _Schools = ({ schools, students })=> {
  return (
    <div>
      <div>There are ({ schools.length }) schools</div>
      <ul className='tiles'>
        {
          schools.map( school => <li className='schoolLi' key={ school.id}><div className='schoolDiv'>
            <div><Link to={`/schools/${school.id}`} onClick={ ()=> console.log(school.name) }>{ school.name }</Link></div>
              <div>Student Count { students.filter( student => student.schoolId === school.id ).length}</div>
            </div></li>)
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({ schools, students })=> ({ schools, students });

const Schools = connect(mapStateToProps)(_Schools);

export default Schools;
