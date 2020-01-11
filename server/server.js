const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const bodyParser = require('body-parser');

const {auth, authsign, authverify} = require('./../config/auth');

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
const registerRoute = require('./routers/register');
const loginRoute = require('./routers/login');

app.use('/api/department', auth, authverify, departmentRoute);
app.use('/api/commune', communeRoute);
app.use('/api/type', typeRoute);
app.use('/api/user', auth, userRoute);
app.use('/api/information', auth, informationRoute);
app.use('/api/meeting', auth, meetingRoute);
app.use('/api/rating', ratingRoute);

app.use('/api/register', registerRoute);
app.use('/api/login', authsign, loginRoute);


app.listen(PORT, HOST, ()=>{
  console.log(`App listen on ${HOST}:${PORT}`)
});