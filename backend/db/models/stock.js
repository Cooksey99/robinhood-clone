'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    ticker: DataTypes.STRING,
    company_name: DataTypes.STRING,
    market_price: DataTypes.DECIMAL
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
  };
  return Stock;
};