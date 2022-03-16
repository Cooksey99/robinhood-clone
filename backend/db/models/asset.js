'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    user_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    avg_price: DataTypes.DECIMAL
  }, {});
  Asset.associate = function(models) {
    // associations can be defined here
    Asset.belongsTo(models.User, {foreignKey: 'user_id'});
    Asset.hasMany(models.Stock, {foreignKey: 'stock_id'});
  };
  return Asset;
};
