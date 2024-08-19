const fs = require('fs');

/**
 * counter.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }
    if (content) {
      const rows = content
        .trim()
        .split('\n');

      const fields = {};
      const headers = rows[0].split(',');
      const properties = headers.slice(0, headers.length - 1);

      for (const row of rows.slice(1)) {
        const columns = row.split(',');
        const values = columns.slice(0, columns.length - 1);
        const dept = columns[columns.length - 1];

        if (!fields[dept]) {
          fields[dept] = [];
        }

        const entry = properties.map((prop, i) => [prop, values[i]]);
        fields[dept].push(Object.fromEntries(entry));
      }

      const totalStudents = Object.values(fields).reduce((acc, grp) => acc + grp.length, 0);
      console.log(`Number of students: ${totalStudents}`);

      for (const [dept, students] of Object.entries(fields)) {
        const studentNames = students.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${dept}: ${students.length}. List: ${studentNames}`);
      }

      return resolve(true); // Ensure that the promise always returns a value
    }

    return resolve(false); // Return a value even if content is undefined (safety fallback)
  });
});

module.exports = countStudents;
