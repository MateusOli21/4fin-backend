const Sequelize = require('sequelize');

const User = require('../app/models/User');
const File = require('../app/models/File');
const Category = require('../app/models/Category');
const Purchase = require('../app/models/Purchase');

const databaseConfig = require('../config/database');

const models = [User, File, Category, Purchase];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
