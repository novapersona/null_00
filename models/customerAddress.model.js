module.exports = (sequelize, DataTypes) => {
    const CustomerAddress = sequelize.define("CustomerAddress", {
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
        region_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        district_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        house: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        flat_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        post_index: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: "customer_address",
        timestamps: false,
    });

    CustomerAddress.associate = (models) => {
        CustomerAddress.belongsTo(models.Customer, {
            foreignKey: "customer_id",
            as: "customer",
        });
        CustomerAddress.belongsTo(models.Region, {
            foreignKey: "region_id",
            as: "region",
        });
        CustomerAddress.belongsTo(models.District, {
            foreignKey: "district_id",
            as: "district",
        });
        CustomerAddress.belongsTo(models.Flat, {
            foreignKey: "flat_id",
            as: "flat",
        });
    };

    return CustomerAddress;
};
