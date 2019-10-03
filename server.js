const express = require('express');
const db = require('./db');
const { School, Student } = db.models;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/schools', async(req, res, next)=> {
  try {
    const allSchools = await School.findAll();
    res.send(allSchools);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/students', async(req, res, next)=> {
  try {
    const allStudents = await Student.findAll();
    res.send(allStudents);
  }
  catch(ex){
    next(ex);
  }
});

db.syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  });
