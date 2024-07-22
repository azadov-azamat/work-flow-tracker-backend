'use strict';

const { Model, DataTypes } = require('sequelize');
const { getHash, randomSalt } = require('../../server/utils/crypto');

module.exports = (sequelize) => {
    class User extends Model {
        static associate({ Attendance, Task, Media, Department }) {
            this.hasMany(Attendance, { foreignKey: 'user_id', as: 'attendances' });
            this.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
            this.belongsTo(Media, { foreignKey: 'media_id', as: 'media_file' });
            this.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
        }
        async matchPassword(password) {
            let resultHash = await getHash(password, this.salt);
            return resultHash === this.hash;
        }

        async setPassword(password) {
            this.salt = await randomSalt();
            this.hash = await getHash(password, this.salt);
        }

    }

    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            media_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Media',
                    key: 'id',
                },
                allowNull: true,
            },
            role: {
                type: DataTypes.ENUM('admin', 'employee', 'manager'),
                allowNull: false,
            },
            salt: DataTypes.STRING,
            hash: DataTypes.STRING,
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            department_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Departments',
                    key: 'id',
                },
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
            underscored: true,
        }
    );

    return User;
};
