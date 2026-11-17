module.exports = (sequelize, DataTypes) => {
    const Types = sequelize.define("Types", {
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
        tableName: "types",
        timestamps: false,
    });

    Types.associate = (models) => {
        Types.hasMany(models.VenueTypes, {
            foreignKey: "typeId",
            as: "venue_types",
        });
    };

    return Types;
};
