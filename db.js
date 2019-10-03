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
  firstName: STRING,
  lastName: STRING,
  email: STRING,
  GPA: DECIMAL
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
    { firstName: 'Nicole', lastName: 'Consolacion', email: 'nikkiconsolacion@gmail.com', GPA: 4.0 },
    { firstName: 'Foo', lastName: 'Bar', email: 'foobar@gmail.com', GPA: 3.2 },
    { firstName: 'Bazz', lastName: 'Quq', email: 'bazzquq@gmail.com', GPA: 3.1 }
  ];
  const [ nicole, foo, bazz ] = await Promise.all(students.map( student => Student.create(student)));
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
