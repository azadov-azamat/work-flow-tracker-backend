'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'employee', 'manager'),
      allowNull: false,
    });

    await queryInterface.addColumn('Users', 'position', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Users', 'department_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Departments',
        key: 'id',
      },
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.removeColumn('Users', 'position');
    await queryInterface.removeColumn('Users', 'department_id');
  },
};
