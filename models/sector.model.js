module.exports = (sequelize, DataTypes) => {
    const Sector = sequelize.define("Sector", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        sector_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "Sector",
        timestamps: false,
    });

    Sector.associate = (models) => {
        Sector.hasMany(models.Seat, {
            foreignKey: "sector_id",
            as: "seats",
        });
    };

    return Sector;
};
