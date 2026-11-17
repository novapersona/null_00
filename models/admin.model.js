const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        is_creator: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        hashed_refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "admin",
        timestamps: false,
    });

    Admin.beforeSave(async (record) => {
        if (record.changed("hashed_password")) {
            record.hashed_password = await bcrypt.hash(record.hashed_password, 10);
        }
    });

    Admin.associate = (models) => {};

    return Admin;
};
