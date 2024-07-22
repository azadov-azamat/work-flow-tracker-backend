'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Attendance extends Model {
        static associate({ User }) {
            this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
        }
    }

    Attendance.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                allowNull: false,
            },
            arrival_time: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Attendance',
            underscored: true,
        }
    );

    return Attendance;
};
