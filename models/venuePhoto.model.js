module.exports = (sequelize, DataTypes) => {
    const VenuePhoto = sequelize.define("VenuePhoto", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        venueId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "venue_photo",
        timestamps: false,
    });

    VenuePhoto.associate = (models) => {
        VenuePhoto.belongsTo(models.Venue, {
            foreignKey: "venueId",
            as: "venue",
        });
    };

    return VenuePhoto;
};
