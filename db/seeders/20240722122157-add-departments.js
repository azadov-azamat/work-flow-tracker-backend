'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('departments', [
      {
        name: 'IT Department',
        region: 'Tashkent',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'HR Department',
        region: 'Samarqand',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Finance Department',
        region: 'Buxoro',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
