SELECT * FROM department;

SELECT * FROM emp_role;

SELECT * FROM employee;

--creates emp_roles table
SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary 
FROM emp_role
JOIN department ON emp_role.dept_id=department.id;

SELECT *
FROM employee
JOIN emp_role ON employee.emp_role_id=emp_role.id;




