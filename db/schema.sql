DROP DATABASE employee_track_db;

CREATE DATABASE employee_track_db;

USE employee_track_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE emp_role(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10),
dept_id INT NOT NULL,
FOREIGN KEY (dept_id) 
REFERENCES department(id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
emp_role_id INT NOT NULL,
FOREIGN KEY (emp_role_id) 
REFERENCES emp_role(id),
manager_id INT,
FOREIGN KEY (manager_id) 
REFERENCES employee(id)
);

-- FOREIGN KEY (manager_id) 
-- REFERENCES employee(id)