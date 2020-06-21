const express = require('express');
const http = require('http');
const Mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net/__CONCOX__';
const PORT = 9090;

const users = require('./router/auth');
const authController = require('./controllers/auth.controller');

const app = express();

app.use(authController.verifyJWTToken)

app.use('/users', users);

app.use(express.json());

Mongoose.connect(DB_URL, (err) => {
  if (err) {
    console.error("Error in connecting DB", err);
  } else {
    console.log("Successfully connected to DB");

    http.createServer(app).listen(PORT, () => {
      console.log("Server started on port:", PORT)
    });

  }
});