'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    watchlist_id: DataTypes.INTEGER,
    ticker: DataTypes.STRING,
    market_price: DataTypes.DECIMAL
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
    Stock.belongsTo(models.Watchlist, {foreignKey: 'stock_id'});
    Stock.belongsTo(models.Asset, {foreignKey: 'stock_id'});
    Stock.belongsTo(models.Watchlist, {foreignKey: 'watchlist_id'});
  };
  return Stock;
};
