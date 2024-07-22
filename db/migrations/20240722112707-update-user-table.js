'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('Users', 'users');
    await queryInterface.renameTable('Attendances', 'attendances');
    await queryInterface.renameTable('Tasks', 'tasks');
    await queryInterface.renameTable('Media', 'medias');
    await queryInterface.renameTable('Departments', 'departments');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
