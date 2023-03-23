const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config.database');
const UserRouter = require('../routes/user.routes');

class Server {
 constructor() {
  //Properties
  this.app = express();
  this.port = process.env.PORT || 8080;
  this.apiPath = '/api/v1';
  this.userPath = `${this.apiPath}/users`;

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
