const Sequelize = require('sequelize');
const { UUID, STRING, UUIDV4, DECIMAL } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

const School = conn.define("school", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: STRING
});

const Student = conn.define("student", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: STRING,
    allowNull: false
  },
  lastName: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false
  },
  GPA: {
    type: DECIMAL,
    allowNull: false
  },
  error: STRING
});

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async()=> {
  await conn.sync({ force: true }); //only for development stage
  let schools = [
    { name: 'Cal Poly' },
    { name: 'Notre Dame' },
    { name: 'Stanford' },
    { name: 'MIT' },
    { name: 'Harvard' },
    { name: 'Yale' }
  ];
  const [calpoly, notredame, standford, mit, harvard, yale ] = await Promise.all( schools.map( school => School.create(school)));

  let students = [
    { firstName: 'Nicole', lastName: 'Consolacion', email: 'nikkiconsolacion@gmail.com', GPA: 4.0, schoolId: calpoly.id },
    { firstName: 'Foo', lastName: 'Bar', email: 'foobar@gmail.com', GPA: 3.2, schoolId: notredame.id },
    { firstName: 'Bazz', lastName: 'Quq', email: 'bazzquq@gmail.com', GPA: 3.1, schoolId: standford.id },
    { firstName: 'Tommy', lastName: 'Pickles', email: 'tpickles@calpoly.edu', GPA: 3.5, schoolId: calpoly.id},
    { firstName: 'Chucky', lastName: 'Finster', email: 'chuckfinst@yahoo.com', GPA: 3.1, schoolId: standford.id},
    { firstName: 'Chandler', lastName: 'Bing', email: 'misschanandlerbong@gmail.com', GPA: 3.7, schoolId: standford.id },
    { firstName: 'Phoebe', lastName: 'Buffet', email: 'pheebs@gmail.com', GPA: 2.5},
    { firstName: 'Ross', lastName: 'Gellar', email: 'dinosaursrock@gmail.com', GPA: 4.0},
    { firstName: 'Monica', lastName: 'Gellar', email: 'crazychef@gmail.com', GPA: 3.8},
    { firstName: 'Joey', lastName: 'Tribiani', email: 'howyoudoin@gmail.com', GPA: 2.0},
    { firstName: 'Rachel', lastName: 'Green', email: 'rgreen@gmail.com', GPA: 2.5}
  ];
  await Promise.all(students.map( student => Student.create(student)));
};

//syncAndSeed()

module.exports = {
  syncAndSeed,
  conn,
  models: {
    School,
    Student
  }
}
