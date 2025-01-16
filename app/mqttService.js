const mqtt = require("mqtt");
const sequelize = require("./config/database");
const { validate, createDeviceValidation } = require("./utils/validation");
const DeviceData = require("./model");

const client = mqtt.connect("mqtt://localhost:1883"); // Adjust to your broker's address

const start = () => {
  client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe("devices/data", (err) => {
      if (err) console.error("Subscription error:", err);
      else console.log("Subscribed to topic: devices/data");
    });
  });

  client.on("message", async (topic, message) => {
    try {
      await sequelize.authenticate();
      const data = validate(createDeviceValidation, JSON.parse(message.toString()));
      const { device_id, humidity, temperature, timestamp } = data;

      await DeviceData.create({
        device_id,
        humidity,
        temperature,
        timestamp,
      });

      console.log("Data saved to database:", data);
    } catch (err) {
      console.error("Error processing MQTT message:", err.message);
    }
  });
};

module.exports = { start };
