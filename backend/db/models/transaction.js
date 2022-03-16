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
  };
  return Transaction;
};
