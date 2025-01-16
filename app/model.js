const { DataTypes } = require("sequelize");
const sequelize = require("./config/database");

const DeviceData = sequelize.define(
  "DeviceData",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: "timestamp without time zone",
      allowNull: false,
    },
  },
  {
    tableName: "device_data", // Nama tabel di database
    timestamps: false, // Nonaktifkan kolom createdAt dan updatedAt
  }
);

module.exports = DeviceData;
