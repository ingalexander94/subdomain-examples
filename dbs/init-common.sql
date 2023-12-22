CREATE DATABASE IF NOT EXISTS common_db;
CREATE USER IF NOT EXISTS 'bengali'@'%' IDENTIFIED BY 'pnrLocemQPpEKHwOfScD';
GRANT ALL PRIVILEGES ON common_db.* TO 'bengali'@'%';

USE common_db;

CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subdomain VARCHAR(50) UNIQUE NOT NULL,
  db_name VARCHAR(100) UNIQUE NOT NULL,
  db_host VARCHAR(50),
  db_username VARCHAR(100),
  db_password VARCHAR(100),
  db_port INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO clients (subdomain, db_name, db_host, db_username, db_password, db_port) VALUES
  ('luis', 'luis_db', 'localhost', 'luis', 'bXOgYNCmMeqDecXnMjyx', 3307),
  ('alexander', 'alexander_db', 'localhost', 'alexander', 'BgIzWlPifKcCxrRIofic', 3307);
