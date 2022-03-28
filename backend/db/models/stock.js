'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    watchlist_id: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER,
    ticker: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {});
  Stock.associate = function(models) {
    // associations can be defined here
    Stock.belongsTo(models.Asset, {foreignKey: 'asset_id'});
    Stock.belongsTo(models.Watchlist, {foreignKey: 'watchlist_id'});
    // Stock.belongsTo(models.Transaction, {foreignKey: 'stock_id'});
  };
  return Stock;
};
