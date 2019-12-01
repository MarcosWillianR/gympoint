import Sequelize from 'sequelize';

import dbconfig from '../configs/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';

class Database {
  constructor() {
    this.init();
  }

  init() {
    const models = [User, Student, Plan];

    this.connection = new Sequelize(dbconfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
