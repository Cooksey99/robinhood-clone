'use strict';

const watchlist = require("./watchlist");

module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    ticker: DataTypes.STRING,
    company_name: DataTypes.STRING,
    market_price: DataTypes.DECIMAL
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
    Stock.belongsTo(models.Watchlist, {foreignKey: 'stock_id'});
    Stock.belongsTo(models.Asset, {foreignKey: 'stock_id'});
  };
  return Stock;
};
