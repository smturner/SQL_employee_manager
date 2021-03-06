SELECT * FROM department;

SELECT * FROM emp_role;

SELECT * FROM employee;

--creates emp_roles table
SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary 
FROM emp_role
JOIN department ON emp_role.dept_id=department.id;

--creates employee table 
SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager 
FROM employee E 
JOIN emp_role R ON E.emp_role_id = R.id 
JOIN department D ON R.dept_id = D.id 
LEFT JOIN employee M on E.manager_id = M.id;

--adds a department
INSERT INTO department (dept_name)
VALUES ("service");

--adds a new employee role
INSERT INTO emp_role(title, salary, dept_id)
VALUES("test", 1000, 1);

--adds a new employee
INSERT INTO employee(first_name, last_name, emp_role_id, manager_id)
VALUES("Pam", "Beesly", 1, 1);

--updates employee role
UPDATE employee 
SET emp_role_id = 2
WHERE id = 9;

--updates empoloyee manager
UPDATE employee
SET manager_id =1
WHERE id= 4;

--order by department name
SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager 
FROM employee E 
JOIN emp_role R ON E.emp_role_id = R.id 
JOIN department D ON R.dept_id = D.id 
LEFT JOIN employee M on E.manager_id = M.id
ORDER BY dept_name;

--order by manager
SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager 
FROM employee E 
JOIN emp_role R ON E.emp_role_id = R.id 
JOIN department D ON R.dept_id = D.id 
LEFT JOIN employee M on E.manager_id = M.id
ORDER BY manager;

--deletes an employee
DELETE FROM employee WHERE id=11;

--deletes a role
DELETE FROM emp_role WHERE id =8;
