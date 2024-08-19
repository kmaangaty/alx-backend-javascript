const express = require('express');
const fs = require('fs');

const SERVER_APP = express();
const SERVER_PORT = 1245;
const DATABASE_FILE = process.argv.length > 2 ? process.argv[2] : '';

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
        const reportSections = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentCategories = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentFieldNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentData = line.split(',');
          const studentFieldValues = studentData.slice(0, studentData.length - 1);
          const category = studentData[studentData.length - 1];
          if (!Object.keys(studentCategories).includes(category)) {
            studentCategories[category] = [];
          }
          const studentEntries = studentFieldNames.map((fieldName, idx) => [
            fieldName, studentFieldValues[idx]]);
          studentCategories[category].push(Object.fromEntries(studentEntries));
        }

        const totalStudentCount = Object
          .values(studentCategories).reduce((previous, current) => (previous || [])
            .length + current.length);
        reportSections.push(`Number of students: ${totalStudentCount}`);
        for (const [category, students] of Object.entries(studentCategories)) {
          reportSections.push(`Number of students in ${category}: ${students.length}. List: ${students.map(
            (student) => student.firstname,
          ).join(', ')
          }`);
        }
        resolve(reportSections.join('\n'));
      }
    });
  }
});

SERVER_APP.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

SERVER_APP.get('/students', (_, res) => {
  const responseSections = ['This is the list of our students'];
  countStudents(DATABASE_FILE)
    .then((report) => {
      responseSections.push(report);
      const responseText = responseSections.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    })
    .catch((err) => {
      responseSections.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseSections.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    });
});

SERVER_APP.listen(SERVER_PORT, () => {
  console.log(`Server listening on PORT ${SERVER_PORT}`);
});

module.exports = SERVER_APP;
