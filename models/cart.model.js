module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        fineshedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
    }, {
        tableName: "cart",
        timestamps: false,
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.Customer, {
            foreignKey: "customer_id",
            as: "customer",
        });
        Cart.belongsTo(models.TicketStatus, {
            foreignKey: "status_id",
            as: "status",
        });
        Cart.hasMany(models.CartItem, {
            foreignKey: "cart_id",
            as: "cart_items",
        });
        Cart.hasMany(models.Booking, {
            foreignKey: "cart_id",
            as: "bookings",
        });
    };

    return Cart;
};
