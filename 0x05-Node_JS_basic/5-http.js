const http = require('http');

const fs = require('fs');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const SERVER_APP = http.createServer();
const DB_FILE_PATH = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counter
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportPieces = [];
        const lines = data.toString('utf-8').trim().split('\n');
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
          const entries = propNames.map((propName, idx) => [
            propName, propValues[idx],
          ]);
          groups[field].push(Object.fromEntries(entries));
        }

        const total = Object.values(groups).reduce((pre, cur) => (pre || []).length + cur.length);
        reportPieces.push(`Number of students: ${total}`);
        for (const [field, group] of Object.entries(groups)) {
          reportPieces.push([`Number of students in ${field}: ${group.length}.`, 'List:',
            group.map((student) => student.firstname).join(', ')].join(' '));
        }
        resolve(reportPieces.join('\n'));
      }
    });
  }
});

const SERVER_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  }, {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];
      countStudents(DB_FILE_PATH)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  }];

SERVER_APP.on('request', (req, res) => {
  for (const handler of SERVER_HANDLERS) {
    if (handler.route === req.url) {
      handler.handler(req, res);
      break;
    }
  }
});

SERVER_APP.listen(SERVER_PORT, SERVER_HOST, () => {
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});

module.exports = SERVER_APP;
