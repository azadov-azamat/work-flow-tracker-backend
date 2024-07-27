const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class LateArrivals extends Model {
        static associate({User}) {
            this.belongsTo(User, {foreignKey: 'user_id', as: 'user'});
        }
    }

    LateArrivals.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        late_duration: {
            type: DataTypes.INTEGER, // This can be changed to appropriate type like INTEGER if it's better suited
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'LateArrivals',
        tableName: 'late_arrivals',
        timestamps: false,
    })

    return LateArrivals;
}
