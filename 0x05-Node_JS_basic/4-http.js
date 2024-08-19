const http = require('http');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const server = http.createServer();
server.on('request', (_, res) => {
  const rpt = 'Hello Holberton School!';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', rpt.length);
  res.statusCode = 200;
  res.write(Buffer.from(rpt));
});
server.listen(SERVER_PORT, SERVER_HOST, () => {
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});
module.exports = server;
