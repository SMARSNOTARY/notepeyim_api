const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const bodyParser = require('body-parser');
const cors = require('cors');

const {auth, authsign, authverify} = require('./../config/auth');
app.use(cors())
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
const fileRoute = require('./routers/file');

app.use('/api/department', departmentRoute);
app.use('/api/commune', communeRoute);
app.use('/api/type', typeRoute);
app.use('/api/user', auth, authverify, userRoute);
app.use('/api/information', auth, authverify, informationRoute);
app.use('/api/meeting', auth, authverify, meetingRoute);
app.use('/api/rating', auth, authverify, ratingRoute);

app.use('/api/register', authsign, registerRoute);
app.use('/api/login', authsign, loginRoute);

app.use('/media', fileRoute);

app.listen(parseInt(PORT), HOST, ()=>{
  console.log(`App listen on ${HOST}:${PORT}`)
});