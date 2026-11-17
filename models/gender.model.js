module.exports = (sequelize, DataTypes) => {
    const Gender = sequelize.define("Gender", {
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
        tableName: "Gender",
        timestamps: false,
    });

    Gender.associate = (models) => {
        Gender.hasMany(models.Customer, {
            foreignKey: "gender_id",
            as: "customers",
        });
        Gender.hasMany(models.HumanCategory, {
            foreignKey: "gender_id",
            as: "human_categories",
        });
    };

    return Gender;
};
