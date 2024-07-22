'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        birth_date: '1980-01-01',
        role: 'admin',
        position: 'Administrator',
        department_id: 1,
        media_id: null, // Agar media fayl bog'lanishi bo'lsa
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Employee User',
        birth_date: '1990-01-01',
        role: 'employee',
        position: 'Developer',
        department_id: 12,
        media_id: null, // Agar media fayl bog'lanishi bo'lsa
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Manager User',
        birth_date: '1985-01-01',
        role: 'manager',
        position: 'Project Manager',
        department_id: 13,
        media_id: null, // Agar media fayl bog'lanishi bo'lsa
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
