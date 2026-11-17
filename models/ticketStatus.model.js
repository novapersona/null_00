module.exports = (sequelize, DataTypes) => {
    const TicketStatus = sequelize.define("TicketStatus", {
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
        tableName: "ticket_status",
        timestamps: false,
    });

    TicketStatus.associate = (models) => {
        TicketStatus.hasMany(models.Booking, {
            foreignKey: "status_id",
            as: "bookings",
        });
        TicketStatus.hasMany(models.Cart, {
            foreignKey: "status_id",
            as: "carts",
        });
        TicketStatus.hasMany(models.Ticket, {
            foreignKey: "status_id",
            as: "tickets",
        });
    };

    return TicketStatus;
};
