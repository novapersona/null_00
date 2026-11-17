module.exports = (sequelize, DataTypes) => {
    const DeliveryMethod = sequelize.define("DeliveryMethod", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "delivery_method",
        timestamps: false,
    });

    DeliveryMethod.associate = (models) => {
        DeliveryMethod.hasMany(models.Booking, {
            foreignKey: "delivery_method_id",
            as: "bookings",
        });
    };

    return DeliveryMethod;
};
