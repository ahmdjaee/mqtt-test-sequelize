const { Op } = require("sequelize");
const sequelize = require("./config/database");
const DeviceData = require("./model");
const ResponseError = require("./utils/responseError");
const { validate, getDeviceValidation } = require("./utils/validation");

/**
 * Returns the latest data for all devices.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 */
const getLatestDevice = async (req, res) => {
  try {
    const result = await DeviceData.findAll({
      order: [
        ["id", "DESC"],
        ["timestamp", "DESC"],
      ],
    });

    res.json(result);
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * Returns all data entries within the specified date range for each device.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 */
const getHistoryDevice = async (req, res) => {
  try {
    const { start, end, device_id } = validate(getDeviceValidation, req.query);

    const result = await DeviceData.findAll({
      where: { device_id, timestamp: { [Op.between]: [start, end] } },
      order: [["timestamp", "DESC"]],
    });

    res.json(result);
  } catch (err) {
    handleError(err, res);
  }
};

/**
 * Returns the average humidity and temperature for each device within the specified date range.
 * @param {import("express").Request} req - Express request object containing query parameters 'start', 'end', and 'device_id'.
 * @param {import("express").Response} res - Express response object used to send the average humidity and temperature.
 */

const getAverageDevice = async (req, res) => {
  try {
    const { start, end, device_id } = validate(getDeviceValidation, req.query);
    const [result] = await sequelize.query(
      `SELECT AVG(humidity) AS average_humidity, AVG(temperature) AS average_temperature
           FROM device_data
           WHERE device_id = $1 AND timestamp BETWEEN $2 AND $3`,
      { bind: [device_id, start, end] }
    );
    res.json(result[0]);
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err, res) => {
  if (err instanceof ResponseError) {
    res.status(err.status).json({ errors: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getLatestDevice, getHistoryDevice, getAverageDevice };
