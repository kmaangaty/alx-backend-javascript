const http = require('http');

const PORT = 1245;
const HOST = 'localhost';
const srv = http.createServer();

srv.on('request', (_, response) => {
  const message = 'Hello Holberton School!';
  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Length', message.length);
  response.statusCode = 200;
  response.write(Buffer.from(message));
});

srv.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = srv;
