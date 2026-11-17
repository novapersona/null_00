module.exports = (sequelize, DataTypes) => {
    const Region = sequelize.define("Region", {
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
        tableName: "region",
        timestamps: false,
    });

    Region.associate = (models) => {
        Region.hasMany(models.District, {
            foreignKey: "region_id",
            as: "districts",
        });
        Region.hasMany(models.Venue, {
            foreignKey: "region_id",
            as: "venues",
        });
        Region.hasMany(models.CustomerAddress, {
            foreignKey: "region_id",
            as: "customer_addresses",
        });
    };

    return Region;
};
