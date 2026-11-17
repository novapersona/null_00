module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("Discount", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        discount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        finish_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }, {
        tableName: "Discount",
        timestamps: false,
    });

    Discount.associate = (models) => {
        Discount.hasMany(models.Booking, {
            foreignKey: "discount_id",
            as: "bookings",
        });
    };

    return Discount;
};
