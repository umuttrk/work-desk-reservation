const dbConnection = require('./utils/dbConnection');
const app = require('./app');

dbConnection.onConnect();

app.listen(3000, '0.0.0.0', () => console.log(`Your server available at http://192.168.1.113:3000`));