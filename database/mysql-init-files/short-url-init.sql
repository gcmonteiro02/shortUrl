CREATE DATABASE IF NOT EXISTS shorturl;
USE shorturl;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  user_id VARCHAR(255) UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS urls (
  id INT AUTO_INCREMENT,
  hits INT DEFAULT 0,
  url VARCHAR(255) NOT NULL, 
  short_url varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users_urls (
		user_id int NOT NULL,
		url_id int NOT NULL,
		date_registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (user_id,url_id),
		FOREIGN KEY (url_id) REFERENCES urls(id),
		FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (user_id) VALUES ('gcmonteiro');
INSERT INTO urls (hits, url, short_url) 
VALUES 
(250, 'www.url1.com.br', 'renault.ly/e23c'), 
(123, 'www.url2.com.br', 'renault.ly/e45x'), 
(323, 'www.url3.com.br', 'renault.ly/e23c'), 
(14523, 'www.url4.com.br', 'renault.ly/e24c'), 
(2321, 'www.url5com.br', 'renault.ly/b23c'), 
(25120, 'www.url6.com.br', 'renault.ly/c2st'), 
(10, 'www.url7.com.br', 'renault.ly/e2sdc'), 
(82, 'www.url8.com.br', 'renault.ly/e234c'), 
(356, 'www.url9.com.br', 'renault.ly/euy3c'), 
(1234, 'www.url10.com.br', 'renault.ly/ef3c'), 
(222, 'www.url11.com.br', 'renault.ly/a23a'), 
(4502, 'www.url12.com.br', 'renault.ly/e3ca'), 
(12345, 'www.url13.com.br', 'renault.ly/e2da3c');

INSERT INTO users_urls (user_id, url_id)
VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12);

CREATE TABLE IF NOT EXISTS app_config_variables (
  cfg_name varchar(250) NOT NULL, 
  cfg_value varchar(250)
);

INSERT INTO app_config_variables (cfg_name, cfg_value) VALUES ('top_user_urls_limit', '10');