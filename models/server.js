const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config.database');

class Server {
 constructor() {
  //Properties
  this.app = express();
  this.port = process.env.PORT || 8080;
  this.apiPath = '/api/v1';
  this.paths = {
   userPath: `${this.apiPath}/users`,
   loginPath: `${this.apiPath}/auth`,
   search: `${this.apiPath}/search`,
   categories: `${this.apiPath}/categories`,
   products: `${this.apiPath}/products`,
   uploads: `${this.apiPath}/uploads`,
  };

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

 middleware() {
  this.app.use(cors());
  this.app.use(express.json());
  this.app.use(express.static('public'));
  // File upload
  this.app.use(
   fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
   })
  );
 }

 routes() {
  this.app.use(this.paths.loginPath, require('../routes/auth.routes'));
  this.app.use(this.paths.userPath, require('../routes/user.routes'));
  this.app.use(this.paths.categories, require('../routes/categories.routes'));
  this.app.use(this.paths.products, require('../routes/products.routes'));
  this.app.use(this.paths.search, require('../routes/search.routes'));
  this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
 }

 listen() {
  this.app.listen(this.port, () => {
   console.log(`app running in the port ${this.port}`);
  });
 }
}

module.exports = Server;
