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
app.get('/api/schools/:id', async(req, res, next)=> {
  try {
    const school = await School.findByPk(req.params.id);
    res.send(school);
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
  Student.create(req.body)
    .then( student => res.status(201).send(student))
    .catch(next)
});

app.get('/api/students/:id', async(req, res, next)=> {
  try {
    const student = await Student.findByPk(req.params.id);
    res.send(student);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/students/:id', async(req, res, next)=> {
  // const student = await Student.findByPk(req.params.id);
  // Student.update(student, req.body)
  //   .then( student => res.status(200).send(student))
  //   .catch(next)
  const student = await Student.findByPk(req.params.id);
  try {
    const updatedStudent = await Student.update(req.body, { where: { id: req.params.id }, returning: true });
    res.send(updatedStudent);
  }
  catch(ex) {
    next(ex);
  }
});

app.delete('/api/students/:id', (req, res, next)=> {
  Student.findByPk(req.params.id)
    .then( student => student.destroy())
    .then( ()=> res.sendStatus(204))
    .catch(next);
});


db.syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  });
