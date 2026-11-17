module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        finish_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        finish_time: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        event_type_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        human_category_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        venue_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        lang_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
        release_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    }, {
        tableName: "event",
        timestamps: false,
    });

    Event.associate = (models) => {
        Event.belongsTo(models.EventType, {
            foreignKey: "event_type_id",
            as: "event_type",
        });
        Event.belongsTo(models.HumanCategory, {
            foreignKey: "human_category_id",
            as: "human_category",
        });
        Event.belongsTo(models.Venue, {
            foreignKey: "venue_id",
            as: "venue",
        });
        Event.belongsTo(models.Lang, {
            foreignKey: "lang_id",
            as: "lang",
        });
        Event.hasMany(models.Ticket, {
            foreignKey: "event_id",
            as: "tickets",
        });
    };

    return Event;
};
