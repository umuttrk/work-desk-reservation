const express=require('express');
const app = express();
const Desk = require('./models/desk');
app.get('/',  (req, res)=> {
    res.send('<h1 style="text-align:center;">work desk reservation API </h1>')
  })


module.exports = app;