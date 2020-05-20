const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        value: Sequelize.INTEGER,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Category, { foreignKey: 'category_id' });
  }
}

module.exports = Purchase;
