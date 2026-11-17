module.exports = (sequelize, DataTypes) => {
    const Country = sequelize.define("Country", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: "Country",
        timestamps: false,
    });

    Country.associate = (models) => {};

    return Country;
};
