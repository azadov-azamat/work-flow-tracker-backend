'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Task extends Model {
        static associate({ User, Media }) {
            this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
            this.belongsTo(Media, { foreignKey: 'media_id', as: 'media_file' });
        }
    }

    Task.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                allowNull: false,
            },
            department: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            task_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deadline: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM,
                values: ['regular', 'permanent'],
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
        },
        {
            sequelize,
            modelName: 'Task',
            underscored: true,
        }
    );

    return Task;
};
