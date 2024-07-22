'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Department extends Model {
        static associate({ User }) {
            this.hasMany(User, { foreignKey: 'department_id', as: 'users' });
        }
    }

    Department.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Department',
            underscored: true,
        }
    );

    return Department;
};
