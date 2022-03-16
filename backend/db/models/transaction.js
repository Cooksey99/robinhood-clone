'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    user_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.DECIMAL
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {foreignKey: 'user_id'});
    Transaction.hasOne(models.Stock, {foreignKey: 'stock_id'});
  };
  return Transaction;
};
