const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const dbFile = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counter
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }
  if (filePath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const report = [];
        const lines = data.toString('utf-8').trim().split('\n');
        const categories = {};
        const fields = lines[0].split(',');
        const studentFields = fields.slice(0, fields.length - 1);

        for (const line of lines.slice(1)) {
          const studentData = line.split(',');
          const studentValues = studentData.slice(0, studentData.length - 1);
          const category = studentData[studentData.length - 1];
          if (!Object.keys(categories).includes(category)) {
            categories[category] = [];
          }
          const entries = studentFields.map((field, idx) => [
            field, studentValues[idx]]);
          categories[category].push(Object.fromEntries(entries));
        }

        const total = Object.values(categories)
          .reduce((prev, curr) => (prev || []).length + curr.length);
        report.push(`Number of students: ${total}`);
        for (const [category, students] of Object.entries(categories)) {
          report.push(`Number of students in ${category}: ${students.length}. List: ${students.map(
            (student) => student.firstname,
          ).join(', ')}`);
        }
        resolve(report.join('\n'));
      }
    });
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const response = ['This is the list of our students'];
  countStudents(dbFile)
    .then((report) => {
      response.push(report);
      const responseText = response.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    })
    .catch((err) => {
      response.push(err instanceof Error ? err.message : err.toString());
      const responseText = response.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    });
});

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});

module.exports = app;
