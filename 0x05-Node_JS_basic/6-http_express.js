const ep = require('express');

const serverApp = ep();
const serverPort = 1245;
serverApp.get('/', (_, response) => {
  response.send('Hello Holberton School!');
});
serverApp.listen(serverPort, () => {
  console.log(`Server listening on PORT ${serverPort}`);
});
module.exports = serverApp;
