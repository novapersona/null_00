module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define("Seat", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        sector_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        row_number: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        number: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        venue_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        seat_type_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        location_in_schema: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: "seat",
        timestamps: false,
    });

    Seat.associate = (models) => {
        Seat.belongsTo(models.Venue, {
            foreignKey: "venue_id",
            as: "venue",
        });
        Seat.belongsTo(models.Sector, {
            foreignKey: "sector_id",
            as: "sector",
        });
        Seat.belongsTo(models.SeatType, {
            foreignKey: "seat_type_id",
            as: "seat_type",
        });
        Seat.hasMany(models.Ticket, {
            foreignKey: "seat_id",
            as: "tickets",
        });
    };

    return Seat;
};
