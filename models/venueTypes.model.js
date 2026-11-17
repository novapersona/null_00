module.exports = (sequelize, DataTypes) => {
    const VenueTypes = sequelize.define("VenueTypes", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        venueId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        typeId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    }, {
        tableName: "venue_types",
        timestamps: false,
    });

    VenueTypes.associate = (models) => {
        VenueTypes.belongsTo(models.Venue, {
            foreignKey: "venueId",
            as: "venue",
        });
        VenueTypes.belongsTo(models.Types, {
            foreignKey: "typeId",
            as: "type",
        });
    };

    return VenueTypes;
};
