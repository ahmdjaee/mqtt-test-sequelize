const sequelize = require('../config/database');
const DeviceData = require('../model');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    // Sinkronisasi model
    await sequelize.sync({ alter: true }); // `alter: true` akan memperbarui tabel jika perlu
    console.log('Database synchronized.');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  } finally {
    await sequelize.close();
  }
})();

