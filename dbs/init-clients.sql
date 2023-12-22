
CREATE DATABASE IF NOT EXISTS luis_db;
CREATE USER IF NOT EXISTS 'luis'@'%' IDENTIFIED BY 'bXOgYNCmMeqDecXnMjyx';
GRANT ALL PRIVILEGES ON luis_db.* TO 'luis'@'%';

USE luis_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (fullname, email) VALUES
  ('Diego Galvis', 'diego.galvis@wiedii.co'),
  ('Freymar Sanchez', 'freymar.sanchez@wiedii.co');


CREATE DATABASE IF NOT EXISTS alexander_db;
CREATE USER IF NOT EXISTS 'alexander'@'%' IDENTIFIED BY 'BgIzWlPifKcCxrRIofic';
GRANT ALL PRIVILEGES ON alexander_db.* TO 'alexander'@'%';

USE alexander_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (fullname, email) VALUES
  ('Mónica Villegas', 'monica.villegas@wiedii.co'),
  ('Yorluis Vega', 'yorluis.vega@wiedii.co');
