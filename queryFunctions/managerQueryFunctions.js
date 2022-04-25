const db = require('../db/connection');
require('console.table');

function sortByManager() {
    db.query(`SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager 
    FROM employee E 
    JOIN emp_role R ON E.emp_role_id = R.id 
    JOIN department D ON R.dept_id = D.id 
    LEFT JOIN employee M on E.manager_id = M.id
    ORDER BY manager`, (err, results) => {
        console.table(results);
        startApp();
    })
};

const updateEmpManager = () => {
    db.promise().query('SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS name FROM employee')
        .then(([employees]) => {
            let employeeChoice = employees.map(({
                id,
                name
            }) => ({
                name: name,
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
                            type: 'list',
                            name: "employee_name",
                            message: "Which employee do you want to update?",
                            choices: employeeChoice
                        },
                        {
                            type: 'list',
                            name: "manager",
                            message: "Who is their new manager?",
                            choices: managerChoices
                        }
                    ])
                        .then(({ employee_name, manager }) => {
                            db.query(
                                'UPDATE employee SET manager_id = ?  WHERE id = ?',
                                [
                                    manager,
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