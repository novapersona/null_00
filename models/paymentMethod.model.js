module.exports = (sequelize, DataTypes) => {
    const PaymentMethod = sequelize.define("PaymentMethod", {
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
        tableName: "payment_method",
        timestamps: false,
    });

    PaymentMethod.associate = (models) => {
        PaymentMethod.hasMany(models.Booking, {
            foreignKey: "payment_method_id",
            as: "bookings",
        });
    };

    return PaymentMethod;
};
