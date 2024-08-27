require('dotenv').config();

export default {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // for development only
        },
    },
};
