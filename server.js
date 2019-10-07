const express = require('express');
const db = require('./db');
const { School, Student } = db.models;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, 'dist'))); //important. connects to main.js in index.html
app.use(express.json()); //important!

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

app.post('/api/students', async(req, res, next)=> {
  Student.create({...req.body })
    .then( student => res.status(201).send(student))
    .catch(next)
});



db.syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  });
