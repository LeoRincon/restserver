const cors = require('cors');
const express = require('express');
const UserRouter = require('../routes/user.routes');

class Server {
 constructor() {
  //Properties
  this.app = express();
  this.port = process.env.PORT || 8080;
  this.apiPath = '/api/v1';
  this.userPath = `${this.apiPath}/users`;

  // MiddleWares
  this.middleware();

  // Methods
  this.routes();
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
