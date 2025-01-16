-- Active: 1736866964594@@127.0.0.1@5432@mqtt_service

-- -----------------------------------------------------
-- ONLY FOR DEVELOPMENT
-- -----------------------------------------------------
CREATE DATABASE mqtt_service;

CREATE TABLE device_data (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(255) NOT NULL,
    humidity FLOAT NOT NULL,
    temperature FLOAT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);

SELECT
    AVG(humidity) AS average_humidity,
    AVG(temperature) AS average_temperature
FROM
    device_data
WHERE
    device_id = 'device1'
    AND timestamp BETWEEN '2025-01-14 10:30:00'
    AND '2025-01-14 10:30:00';

SELECT
    *
FROM
    device_data;

DELETE FROM
    device_data;

DROP TABLE device_data;