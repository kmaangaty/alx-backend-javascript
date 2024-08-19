const fs = require('fs');

/**
 * counter.
 */

const countStudents = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(filePath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const data = fs
    .readFileSync(filePath, 'utf-8')
    .trim()
    .split('\n');

  const fields = {};

  const headers = data[0].split(',');
  const props = headers.slice(0, headers.length - 1);
  for (const row of data.slice(1)) {
    const values = row.split(',');
    const studentProps = values.slice(0, values.length - 1);
    const dept = values[values.length - 1];
    if (!fields[dept]) {
      fields[dept] = [];
    }
    const entry = props.map((prop, i) => [prop, studentProps[i]]);
    fields[dept].push(Object.fromEntries(entry));
  }
  const totalStudents = Object.values(fields).reduce((acc, grp) => acc + grp.length, 0);
  console.log(`Number of students: ${totalStudents}`);
  for (const [dept, students] of Object.entries(fields)) {
    const names = students.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${dept}: ${students.length}. List: ${names}`);
  }
};

module.exports = countStudents;
