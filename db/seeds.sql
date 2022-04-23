INSERT INTO department(dept_name) 
VALUES ('Engineering'),
('Finance'),
('Legal'),
('Sales');


INSERT INTO emp_role(title, salary, dept_id)
 VALUES ('Sales Lead', '100000', 4),
 ('Salesperson', '80000', 4),
 ('Lead Engineer', '150000', 1),
 ('Software Engineer', '120000', 1),
 ('Account Manager', '160000', 2),
 ('Accountant', '125000', 2),
 ('Legal Team Lead', '250000', 3),
 ('Lawyer', '190000', 3);


INSERT INTO employee (first_name, last_name, emp_role_id, manager_id)
VALUES ('Michael', 'Scott', 1, null),
('Dwight', 'Schrute', 2, 1),
('Jim', 'Halpert', 3, null),
('Andy', 'Bernard', 4, 3),
('Angela', 'Martin', 5, null),
('Kevin', 'Malone', 6, 5),
('Toby', 'Flenderson', 7, null),
('Holly', 'Flax', 8, 7);
