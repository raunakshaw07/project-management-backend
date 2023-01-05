require('dotenv').config({ path: './config/config.env' })
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

const app = express();

// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Passport
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session());
const initializePassport = require('./config/passport');
initializePassport(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Database
require('./config/db')();

// Routes
app.use('/api', require('./routes/index'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Node ENV: ${process.env.NODE_ENV}`)
});