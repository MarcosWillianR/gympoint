import { Model, DataTypes } from 'sequelize';

class Registration extends Model {
  static init(sequelize) {
    super.init({
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      price: DataTypes.DECIMAL(10, 2),
    }, { sequelize });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id' });
  }
}

export default Registration;
