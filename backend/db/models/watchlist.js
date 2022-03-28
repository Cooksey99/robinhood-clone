'use strict';
module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define('Watchlist', {
    user_id: DataTypes.INTEGER,
    list_name: DataTypes.STRING
  }, {});
  Watchlist.associate = function(models) {
    // associations can be defined here
    Watchlist.belongsTo(models.User, {foreignKey: 'user_id'});
    Watchlist.hasMany(models.Stock, {foreignKey: 'watchlist_id'});
  };
  return Watchlist;
};
