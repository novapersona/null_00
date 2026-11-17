module.exports = (sequelize, DataTypes) => {
    const CustomerCard = sequelize.define("CustomerCard", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        customer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        month: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        is_main: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        tableName: "customer_card",
        timestamps: false,
    });

    CustomerCard.associate = (models) => {
        CustomerCard.belongsTo(models.Customer, {
            foreignKey: "customer_id",
            as: "customer",
        });
    };

    return CustomerCard;
};
