const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_PATH = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counter
 */
const countStudents = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
  } else {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const reports = [];
        const rows = data.toString('utf-8').trim().split('\n');
        const groups = {};
        const headers = rows[0].split(',');
        const props = headers.slice(0, headers.length - 1);

        rows.slice(1).forEach((row) => {
          const values = row.split(',');
          const studentProps = values.slice(0, values.length - 1);
          const field = values[values.length - 1];

          if (!groups[field]) {
            groups[field] = [];
          }

          const tempObj = {};
          props.forEach((prop, idx) => {
            tempObj[prop] = studentProps[idx];
          });

          groups[field].push(tempObj);
        });

        const totalStudents = Object.values(groups).reduce((acc, cur) => acc + cur.length, 0);
        reports.push(`Number of students: ${totalStudents}`);

        for (const [field, students] of Object.entries(groups)) {
          const names = students.map((s) => s.firstname).join(', ');
          reports.push(`Number of students in ${field}: ${students.length}. List: ${names}`);
        }

        resolve(reports.join('\n'));
      }
    });
  }
});

const routes = [
  {
    path: '/',
    handler(_, res) {
      const msg = 'Hello Holberton School!';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', msg.length);
      res.statusCode = 200;
      res.write(Buffer.from(msg));
    },
  },
  {
    path: '/students',
    handler(_, res) {
      const msgParts = ['This is the list of our students'];
      countStudents(DB_PATH)
        .then((report) => {
          msgParts.push(report);
          const msg = msgParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', msg.length);
          res.statusCode = 200;
          res.write(Buffer.from(msg));
        })
        .catch((err) => {
          msgParts.push(err.message);
          const msg = msgParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', msg.length);
          res.statusCode = 200;
          res.write(Buffer.from(msg));
        });
    },
  },
];

app.on('request', (req, res) => {
  const route = routes.find((r) => r.path === req.url);
  if (route) {
    route.handler(req, res);
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
