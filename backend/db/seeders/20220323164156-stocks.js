'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Stocks', [
      {
        watchlist_id: 1,
        ticker: 'AAPL',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        watchlist_id: 1,
        ticker: 'TSLA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        watchlist_id: 1,
        ticker: 'GOOGL',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Stocks', null, {});
  }
};
