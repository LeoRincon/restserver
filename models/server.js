const cors = require('cors');
const express = require('express');

const UserRouter = require('../routes/user.routes');
const LoginRouter = require('../routes/auth.routes');

const { dbConnection } = require('../database/config.database');

class Server {
 constructor() {
  //Properties
  this.app = express();
  this.port = process.env.PORT || 8080;
  this.apiPath = '/api/v1';
  this.userPath = `${this.apiPath}/users`;
  this.loginPath = `${this.apiPath}/auth`;

  // Connect to database
  this.connectDB();

  // MiddleWares
  this.middleware();

  // Methods
  this.routes();
 }

 async connectDB() {
  await dbConnection();
 }

 routes() {
  this.app.use(this.loginPath, LoginRouter);
  this.app.use(this.userPath, UserRouter);
 }

 middleware() {
  this.app.use(cors());
  this.app.use(express.json());
  this.app.use(express.static('public'));
 }

 listen() {
  this.app.listen(this.port, () => {
   console.log(`app running in the port ${this.port}`);
  });
 }
}

module.exports = Server;
