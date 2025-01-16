const { Sequelize } = require("sequelize");

const config = {
  host: "localhost",
  database: "mqtt_service",
  dialect: "postgres",
  username: "postgres",
  password: "",
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

module.exports = sequelize;
