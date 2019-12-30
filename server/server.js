const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
  res
    .status(200)
    .json({
      'result': 'NOTEPEYIM API'
    })
});

const departmentRoute = require('./routers/departement');
const communeRoute = require('./routers/commune');
const typeRoute = require('./routers/type');
const userRoute = require('./routers/user');
const informationRoute = require('./routers/information');
const meetingRoute = require('./routers/meeting');
const ratingRoute = require('./routers/rating');

app.use('/api/department', departmentRoute);
app.use('/api/commune', communeRoute);
app.use('/api/type', typeRoute);
app.use('/api/user', userRoute);
app.use('/api/information', informationRoute);
app.use('/api/meeting', meetingRoute);
app.use('/api/rating', ratingRoute);


app.listen(PORT, HOST, ()=>{
  console.log(`App listen on ${HOST}:${PORT}`)
});