const express=require('express');

const app = express();


app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
app.listen(3000, '0.0.0.0',()=>console.log("server is listening on port 3000"));