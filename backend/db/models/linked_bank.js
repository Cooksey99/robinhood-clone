'use strict';
module.exports = (sequelize, DataTypes) => {
  const Linked_bank = sequelize.define('Linked_bank', {
    user_id: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    account_number: DataTypes.INTEGER,
    routing_number: DataTypes.INTEGER
  }, {});
  Linked_bank.associate = function(models) {
    // associations can be defined here
    Linked_bank.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return Linked_bank;
};
