const inquirer = require('inquirer');
const { query } = require('./db/connection');
require('console.table');
const db = require('./db/connection');
// const { allDepts, allRoles } = require('./queryFunctions')

function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["View All Departments", "Add Department", "View All Roles", "Add Role", "Remove Role", "View All Employees", "Sort Employees by Department", "Sort Employees by Manager", "Add an Employee", "Remove Employee", "Update Employee Role", "exit"]
        }
    ])
        .then((ans) => {
            switch (ans.menu) {
                case "View All Departments":
                    allDepts();
                    break;
                case "Add Department":
                    addDepts();
                    break;
                case "View All Roles":
                    allRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "View All Employees":
                    allEmployees();
                    break;
                case "Sort Employees by Department":
                    sortByDept();
                    break;
                case "Sort Employees by Manager":
                    sortByManager();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateEmpRole();
                    break;
                case "Update Employee Manager":
                    updateEmpManager();
                case "Quit":
                    break;
                default:
                    process.exit();
            }
        })
}
startApp();

//query functions
function allDepts() {
    db.query('SELECT id, dept_name AS department FROM department;', function (err, results) {
        console.table(results);
        startApp();
    });
}

const addDepts = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: "name",
            message: "What is the name of the department?"
        }
    ])
        .then((dept_name) => {
            db.query(`INSERT INTO department(dept_name) VALUES (?)`, dept_name.name, function (err, results) {
                // console.table(results)
                console.log(err)
            });
            allDepts();
        });
};

function allRoles() {
    db.query('SELECT emp_role.id, emp_role.title, department.dept_name AS department, emp_role.salary FROM emp_role JOIN department ON emp_role.dept_id=department.id', (err, results) => {
        console.table(results)
        startApp();
    });
}

const addRole = () => {
    db.promise().query('SELECT department.id, department.dept_name FROM department')
        .then(([departments]) => {
           let departmentChoices = departments.map(({
                id,
                dept_name
            }) => ({
                name: dept_name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'input',
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    type: 'input',
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: 'list',
                    name: "department",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(({ title, department, salary }) => {
                    db.query(
                        'INSERT INTO emp_role SET ?',
                        {
                            title: title,
                            dept_id: department,
                            salary: salary
                        },
                        function (err, results) {
                            console.log(err)
                        }
                    )
                })
                .then(() => allRoles())
        })
}

const removeRole = () => {
    db.promise().query('SELECT emp_role.id, emp_role.title FROM emp_role')
        .then(([removedRole]) => {
            let remove = removedRole.map(({
                id,
                title
            }) => ({
                name: title,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: "emp_role",
                    message: "Which role do you want to remove?",
                    choices: remove
                },
            ])
            .then((roleTitle) => {
                db.query('DELETE FROM emp_role WHERE id= ?', [roleTitle.emp_role], function (err, results) {
                    console.log(err)
                    
                })
            })
            .then(() => allRoles())
})
}

function allEmployees() {
    db.query('SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name AS department, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager FROM employee E JOIN emp_role R ON E.emp_role_id = R.id JOIN department D ON R.dept_id = D.id LEFT JOIN employee M on E.manager_id = M.id', (err, results) => {
        console.table(results)
        startApp();
    });
}

function sortByDept() {
    db.query(`SELECT E.id, E.first_name, E.last_name, R.title, D.dept_name, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager FROM employee E JOIN emp_role R ON E.emp_role_id = R.id JOIN department D ON R.dept_id = D.id LEFT JOIN employee M on E.manager_id = M.id ORDER BY dept_name`, (err, results) => {
        console.table(results);
        startApp();
    });
}

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
}

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
}

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


// const updateEmpRole = () => {
//     db.query('Select CONCAT(employee.first_name, " ", employee.Last_name) AS name FROM employee')
//         .then(([employees]) => {
//             let employeeChoice = employees.map(({
//                 id,
//                 first_name,
//                 last_name
//             }) => ({
//                 name: `${first_name} ${last_name}`,
//                 value: id
//             }))
//             console.log(employeeChoice)
    // db.promise().query('SELECT emp_role.id, emp_role.title FROM emp_role')
    //             .then(([roles]) => {
    //                 let roleChoices = roles.map(({
    //                     id,
    //                     title
    //                 }) => ({
    //                     name: title,
    //                     value: id
    //                 }));
    //                 console.log(roleChoices)

    //                 inquirer.prompt([
    //                     {
    //                         type: 'list',
    //                         name: "employee_name",
    //                         message: "Which employee's role do you want to update?",
    //                         choices: employeeChoice
    //                     },
    //                     {
    //                         type: 'list',
    //                         name: "role",
    //                         message: "Which role do you want to assign the selected employee?",
    //                         choices: roleChoices
    //             }
    //         ])
    //         .then(({ employee_name, role }) => {
    //             db.query('UPDATE employee SET emp_role_id = ? WHERE id = ?',
    //              {
    //                 id: employee_name,
    //                  emp_role_id: role
    //             },
    //             function(err, results) {
    //                 console.table(results)
    //             }
    //             )
    //         })
    //         .then(() => startApp())
    //     })
    // // })



    //     }





