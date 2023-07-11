const express=require('express');

const app = express();






app.get('/',  (req, res)=> {
    res.send('<h1 style="text-align:center;">work desk reservation API </h1>')
  })
  
app.listen(3000, '0.0.0.0',()=>console.log(`Your server available at http://192.168.1.113:3000`));