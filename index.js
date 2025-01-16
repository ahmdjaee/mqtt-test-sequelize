const express = require("express");
const bodyParser = require("body-parser");
const mqttService = require("./app/mqttService");
const routes = require("./app/routes");

const app = express();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use("/api/data", routes);

// Start MQTT Service
mqttService.start();

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
