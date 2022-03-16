'use strict';
module.exports = (sequelize, DataTypes) => {
  const Linked_bank = sequelize.define('Linked_bank', {
    user_id: DataTypes.INTEGER,
    nane: DataTypes.STRING,
    account_number: DataTypes.INTEGER,
    routing_number: DataTypes.INTEGER
  }, {});
  Linked_bank.associate = function(models) {
    // associations can be defined here
  };
  return Linked_bank;
};