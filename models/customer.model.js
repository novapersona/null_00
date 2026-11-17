const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        lang_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        hashed_refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "customer",
        timestamps: false,
    });

    Customer.beforeSave(async (record) => {
        if (record.changed("hashed_password")) {
            record.hashed_password = await bcrypt.hash(record.hashed_password, 10);
        }
    });

    Customer.associate = (models) => {
        Customer.belongsTo(models.Gender, {
            foreignKey: "gender_id",
            as: "gender",
        });
        Customer.belongsTo(models.Lang, {
            foreignKey: "lang_id",
            as: "lang",
        });
        Customer.hasMany(models.CustomerCard, {
            foreignKey: "customer_id",
            as: "cards",
        });
        Customer.hasMany(models.CustomerAddress, {
            foreignKey: "customer_id",
            as: "addresses",
        });
        Customer.hasOne(models.Cart, {
            foreignKey: "customer_id",
            as: "cart",
        });
    };

    return Customer;
};
