module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "react-backend_db"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/development"
    }
  },
  test: {
    client: "postgresql",
    connection: {
      database: "react-backend_db_test"
    },
    migrations: {
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds/test"
    }
  }
}
