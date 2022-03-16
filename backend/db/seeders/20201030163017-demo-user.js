'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        first_name: 'demo',
        last_name: 'user',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'fake@user.io',
        first_name: 'Fake',
        last_name: 'User',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: 'anotherfake@user.io',
        first_name: 'Fake',
        last_name: 'User',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['demo@user.io', 'fake@user.io', 'anotherfake@user.io'] }
    }, {});
  }
};
