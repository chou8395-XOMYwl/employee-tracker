DROP DATABASE IF EXISTS employee;
CREATE DATABASE employee;
USE employee;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(6, 0) NOT NULL,
  department_id INTEGER NOT NULL,
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  nameFirst VARCHAR(30) NOT NULL,
  nameLast VARCHAR(30) NOT NULL,
  roleID INTEGER NOT NULL,
  idManager INTEGER,
);