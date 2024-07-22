'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'media_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Media',
        key: 'id',
      },
      allowNull: true,
    });

    await queryInterface.addColumn('Tasks', 'media_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Media',
        key: 'id',
      },
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'media_id');
    await queryInterface.removeColumn('Tasks', 'media_id');
  },
};
