const fs = require('fs');

/**
 * counter.
 */

const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const lines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');

  const groups = {};

  const fieldNames = lines[0].split(',');
  const propNames = fieldNames.slice(0, fieldNames.length - 1);
  for (const line of lines.slice(1)) {
    const record = line.split(',');
    const propValues = record.slice(0, record.length - 1);
    const field = record[record.length - 1];
    if (!Object.keys(groups).includes(field)) {
      groups[field] = [];
    }
    const entries = propNames.map((name, index) => [name, propValues[index]]);
    groups[field].push(Object.fromEntries(entries));
  }
  const total = Object.values(groups).reduce((acc, cur) => (acc || []).length + cur.length);
  console.log(`Number of students: ${total}`);
  for (const [field, group] of Object.entries(groups)) {
    const names = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${names}`);
  }
};

module.exports = countStudents;
