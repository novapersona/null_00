module.exports = (sequelize, DataTypes) => {
    const TicketType = sequelize.define("TicketType", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        ticket_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "Tycket_Type",
        timestamps: false,
    });

    TicketType.associate = (models) => {
        TicketType.hasMany(models.Ticket, {
            foreignKey: "ticket_type_id",
            as: "tickets",
        });
    };

    return TicketType;
};
