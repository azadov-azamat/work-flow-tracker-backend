'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Media extends Model {
        static associate({ User }) {
            this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
        }
    }

    Media.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Media',
            underscored: true,
        }
    );

    return Media;
};
