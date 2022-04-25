const db = require('../db/connection');
require('console.table');


function allEmployees() {
    db.query('SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name AS department, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager FROM employee E JOIN emp_role R ON E.emp_role_id = R.id JOIN department D ON R.dept_id = D.id LEFT JOIN employee M on E.manager_id = M.id', (err, results) => {
        console.table(results)
        startApp();
    });
};

const addEmployee = () => {
    db.promise().query('SELECT emp_role.id, emp_role.title FROM emp_role')
        .then(([roles]) => {
            let roleChoices = roles.map(({
                id,
                title
            }) => ({
                name: title,
                value: id
            }));

            db.promise().query('SELECT CONCAT (employee.first_name, " ", employee.last_name) AS name, employee.id FROM employee')
                .then(([managers]) => {
                    let managerChoices = managers.map(({
                        id,
                        name
                    }) => ({
                        name: name,
                        value: id
                    }));

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: "firstName",
                            message: "What is the employee's first name?"
                        },
                        {
                            type: 'input',
                            name: "lastName",
                            message: "What is the employee's last name?"
                        },
                        {
                            type: 'list',
                            name: "role",
                            message: "What is the employee's role?",
                            choices: roleChoices
                        },
                        {
                            type: 'list',
                            name: "manager",
                            message: "Who is the employee's manager?",
                            choices: managerChoices
                        }
                    ])
                        .then(({ firstName, lastName, role, manager }) => {
                            db.query(
                                'INSERT INTO employee SET ?',
                                {
                                    first_name: firstName,
                                    last_name: lastName,
                                    emp_role_id: role,
                                    manager_id: manager
                                },
                                function (err, results) {
                                    console.log(err)
                                }
                            )
                        })
                        .then(() => allEmployees())
                });
        });
};

const removeEmployee = () => {
    db.promise().query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS name FROM employee')
        .then(([employees]) => {
            let employeeChoice = employees.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: "employee_name",
                    message: "Which employee do you want to remove?",
                    choices: employeeChoice
                },
            ])
            .then((firstLastName) => {
                db.query('DELETE FROM employee WHERE id= ?', [firstLastName.employee_name], function (err, results) {
                    console.log(err)
                    
                })
            })
            .then(() => allEmployees())
})
};
const updateEmpRole = () => {
    db.promise().query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS name FROM employee')
        .then(([employees]) => {
            let employeeChoice = employees.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));

            db.promise().query('SELECT id, title FROM emp_role')
                .then(([roles]) => {
                    let roleChoice = roles.map(({
                        id,
                        title
                    }) => ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: "employee_name",
                            message: "Which employee's role do you want to update?",
                            choices: employeeChoice
                        },
                        {
                            type: 'list',
                            name: "emp_role",
                            message: "Which role do you want to assign the selected employee?",
                            choices: roleChoice
                        }
                    ])
                        .then(({ employee_name, emp_role }) => {
                            db.query(
                                'UPDATE employee SET emp_role_id = ?  WHERE id = ?',
                                [
                                    emp_role,
                                    employee_name
                                ], 
                                function (err, results) {
                                    console.log(err)
                                }
                            )
                        })
                        .then(() => allEmployees())
                });
        });
};

module.exports = {
    allEmployees, addEmployee, updateEmpRole, removeEmployee
}