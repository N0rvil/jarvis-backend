const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');



const authenticationRoutes = require('./routes/authentication');
const sequelize = require('./util/database');

const contentController = require('./routes/content');
const noteController = require('./routes/note');
const weatherController = require('./routes/weather');

const User = require('./models/user');
const Session = require('./models/session');
const Note = require('./models/note');


const app = new express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3006;


app.use(authenticationRoutes);
app.use(contentController);

app.use(noteController);
app.use(weatherController);

app.get('/', (req, res, next) => {
  res.console.log('running')
})




User.hasMany(Session);
User.hasMany(Note);
    
sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });


