const express=require('express');
const app = express();
var cors = require('cors')
app.use(cors())
require('./models/associations');
const reservationRoutes=require('./routes/reservationRoutes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Cyclone api')
});
app.use('/api/reservation',reservationRoutes)


module.exports = app;