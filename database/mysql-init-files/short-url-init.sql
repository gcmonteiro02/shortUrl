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

CREATE TABLE IF NOT EXISTS app_config_variables (
  cfg_name varchar(250) NOT NULL, 
  cfg_value varchar(250)
);

INSERT INTO app_config_variables (cfg_name, cfg_value) VALUES ('top_user_urls_limit', '10');
INSERT INTO app_config_variables (cfg_name, cfg_value) VALUES ('top_global_urls_limit', '10');