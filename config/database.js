const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });
} else {
    const isRemote = process.env.DB_HOST && process.env.DB_HOST !== "localhost" && process.env.DB_HOST !== "127.0.0.1";
    sequelize = new Sequelize(
        process.env.DB_NAME || "iticket",
        process.env.DB_USER || "postgres",
        process.env.DB_PASSWORD || "postgres",
        {
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 5432,
            dialect: "postgres",
            logging: false,
            ...(isRemote && {
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false,
                    },
                },
            }),
        }
    );
}

module.exports = sequelize;

