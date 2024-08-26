module.exports = {
    development: {
        username: "neondb_owner",
        password: "Vem3kHEyo6LX",
        database: "neondb",
        host: "ep-lucky-salad-a5aj6sex.us-east-2.aws.neon.tech",
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
    production: {
        use_env_variable: "DATABASE_URL",
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
