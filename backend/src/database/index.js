import Sequelize from 'sequelize';

import dbconfig from '../configs/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';

class Database {
  constructor() {
    this.init();
  }

  init() {
    const models = [User, Student, Plan, Registration];

    this.connection = new Sequelize(dbconfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
