module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define("Ticket", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        event_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        seat_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        service_fee: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
        status_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        ticket_type_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
    }, {
        tableName: "ticket",
        timestamps: false,
    });

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.Event, {
            foreignKey: "event_id",
            as: "event",
        });
        Ticket.belongsTo(models.Seat, {
            foreignKey: "seat_id",
            as: "seat",
        });
        Ticket.belongsTo(models.TicketStatus, {
            foreignKey: "status_id",
            as: "status",
        });
        Ticket.belongsTo(models.TicketType, {
            foreignKey: "ticket_type_id",
            as: "ticket_type",
        });
        Ticket.hasMany(models.CartItem, {
            foreignKey: "ticket_id",
            as: "cart_items",
        });
    };

    return Ticket;
};
