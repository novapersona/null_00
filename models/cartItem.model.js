module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("CartItem", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        ticket_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        cart_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    }, {
        tableName: "cart_item",
        timestamps: false,
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Cart, {
            foreignKey: "cart_id",
            as: "cart",
        });
        CartItem.belongsTo(models.Ticket, {
            foreignKey: "ticket_id",
            as: "ticket",
        });
    };

    return CartItem;
};
