import Sequelize from 'sequelize';

import dbconfig from '../configs/database';

import User from '../app/models/User';
import Student from '../app/models/Student';

class Database {
  constructor() {
    this.init();
  }

  init() {
    const models = [User, Student];

    this.connection = new Sequelize(dbconfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
