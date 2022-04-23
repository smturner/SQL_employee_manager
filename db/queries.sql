SELECT * FROM department;

SELECT * FROM emp_role;

SELECT * FROM employee;

--creates emp_roles table
SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary 
FROM emp_role
JOIN department ON emp_role.dept_id=department.id;

--create employee table but missing mamanger name and department name
SELECT employee.id, employee.first_name, employee.last_name, emp_role.title, emp_role.dept_id AS department, emp_role.salary, employee.manager_id
FROM employee
JOIN emp_role ON employee.emp_role_id=emp_role.id;


SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager 
FROM employee E 
JOIN emp_role R ON E.emp_role_id = R.id 
JOIN department D ON R.dept_id = D.id 
LEFT JOIN employee M on E.manager_id = M.id;
-- LEFT OUTER JOIN employee ON employee.manager_id=employee.id;

-- SELECT employee.id, employee.manager_id
-- FROM employee1, employee2
-- INNER JOIN employee1 ON employee2 =employee.manager_id;


INSERT INTO department (dept_name)
VALUES ("service");

INSERT INTO emp_role(title, salary, dept_id)
VALUES("test", 1000, 1);

INSERT INTO employee(first_name, last_name, emp_role_id, manager_id)
VALUES("Pam", "Beesly", 1, 1);

UPDATE employee 
SET emp_role_id = 2
WHERE id = 9;
