const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const app = express();
const PORT = 8080;

mongoose.connect(
  'mongodb+srv://romaan:passwordpassword@database-tm3kj.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

//route requires
const user = require('./routes/userRoutes');

// MIDDLEWARE
app.use(morgan('dev'));

app.use(
  session({
    secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
    resave: false, //required
    saveUninitialized: false, //required
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser

//sessions
app.use((req, res, next) => {
  console.log('req.session', req.session);
  next();
});

// app.post('/user', (req, res) => {
//   console.log('user signup');
//   req.session.username = req.body.username;
//   res.end();
// });

// routes
app.use('/user', user);

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
