module.exports = (sequelize, DataTypes) => {
    const Flat = sequelize.define("Flat", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        etaj: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "Flat",
        timestamps: false,
    });

    Flat.associate = (models) => {
        Flat.hasMany(models.CustomerAddress, {
            foreignKey: "flat_id",
            as: "addresses",
        });
    };

    return Flat;
};
