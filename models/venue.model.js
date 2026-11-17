module.exports = (sequelize, DataTypes) => {
    const Venue = sequelize.define("Venue", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: { 
            type: DataTypes.STRING,
            allowNull: true,
        },
        site: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        schema: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        district_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: "venue",
        timestamps: false,
    });

    Venue.associate = (models) => {
        Venue.belongsTo(models.Region, {
            foreignKey: "region_id",
            as: "region",
        });
        Venue.belongsTo(models.District, {
            foreignKey: "district_id",
            as: "district",
        });
        Venue.hasMany(models.VenueTypes, {
            foreignKey: "venueId",
            as: "venue_types",
        });
        Venue.hasMany(models.VenuePhoto, {
            foreignKey: "venueId",
            as: "photos",
        });
        Venue.hasMany(models.Seat, {
            foreignKey: "venue_id",
            as: "seats",
        });
        Venue.hasMany(models.Event, {
            foreignKey: "venue_id",
            as: "events",
        });
    };

    return Venue;
};
